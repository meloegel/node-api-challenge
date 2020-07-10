require('dotenv').config();

const express = require('express');

const projectsRouter = require('./data/seeds/projectsRouter');
const actionsRouter = require('./data/seeds/actionsRouter');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    const message = process.env.MESSAGE
    res.status(200).json({ message })
});

server.use('/api/projects', projectsRouter);
server.use('/api/projects/:id/actions', actionsRouter);


const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
})