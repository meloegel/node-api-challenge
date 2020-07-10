const express = require('express');

const projectsRouter = require('./data/seeds/projectsRouter');
const actionsRouter = require('./data/seeds/actionsRouter');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Its working!`)
});

server.use('/api/projects', projectsRouter);
server.use('/api/projects/:id/actions', actionsRouter);

server.listen(8000, () => {
    console.log('\n*** Server Running on http://localhost:8000 ***\n');
})