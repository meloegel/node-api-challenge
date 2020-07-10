const express = require('express');

const Actions = require('../helpers/actionModel')

const router = express.Router();

router.post('/', (req, res) => {
    const newAction = req.body;
    if (!newAction.notes || !newAction.description || !newAction.project_id) {
        res.status(400).json({ errorMessage: "Please provide a note and description for this action." })
    } else {
        Actions.insert(newAction)
            .then((action) => {
                res.status(201).json(action)
            }).catch(error => {
                console.log(error)
                res.status(500).json({ errorMessage: "Error while saving this action." })
            })
    }
})

router.get('/', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        }).catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "The action could not be retrieved." })
        })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ message: 'The action with that ID does not exist' })
            }
        }).catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'The action could not be deleted' })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    if (!changes.notes || !changes.description || !changes.project_id) {
        res.status(400).json({ errorMessage: "Please provoide a note and description for the action" })
    } else {
        Actions.update(req.params.id, changes)
            .then(action => {
                if (action) {
                    res.status(200).json(action)
                } else {
                    res.status(404).json({ message: "The action with the specified ID does not exist" })
                }
            }).catch(error => {
                console.log(error)
                res.status(500).json({ errorMessage: "Error updating the action" })
            })
    }
})


module.exports = router;