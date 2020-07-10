const express = require('express');

const Projects = require('../helpers/projectModel')

const router = express.Router();

router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
        res.status(400).json({ errorMessage: "Please provide a name and description for this project." })
    } else {
        Projects.insert(newProject)
            .then((project) => {
                res.status(201).json(project)
            }).catch(error => {
                console.log(error)
                res.status(500).json({ errorMessage: "Error while saving this project." })
            })
    }
})

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        }).catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "The projects could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                res.status(400).json({ message: 'Project with that id does not exist' })
            }
        }).catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "The projects could not be retrieved." })
        })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ message: 'The project with that ID does not exist' })
            }
        }).catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'The project could not be deleted' })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    if (!changes.name || !changes.description) {
        res.status(400).json({ errorMessage: "Please provoide a name and description for the project" })
    } else {
        Projects.update(req.params.id, changes)
            .then(project => {
                if (project) {
                    res.status(200).json(project)
                } else {
                    res.status(404).json({ message: "The project with the specified ID does not exist" })
                }
            }).catch(error => {
                console.log(error)
                res.status(500).json({ errorMessage: "Error updating the project" })
            })
    }
})


module.exports = router;