import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())

app.delete('/task/:id', async (req, res) => {
    await prisma.toDoList.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(req.body)
})

app.put('/task/:id', async (req, res) => {
    const updateTask = await prisma.toDoList.update({
        where: {
            id: req.params.id
        },
        data: {
            task: req.body.task 
        },
    });
    res.status(200).json(updateTask);
});


app.post('/task', async (req, res) => {
    await prisma.toDoList.create({
        data: {
            task: req.body.task,
        }
    })
    res.status(200).json(req.body)
})

app.get('/task', async (req, res) => {
    const task = await prisma.toDoList.findMany()

    res.status(200).json(task)
})

app.get('/', (req, res) => {
    res.json("Wello word")
})

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

export default app;