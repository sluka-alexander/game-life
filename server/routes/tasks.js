const express =require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken')

module.exports = router;

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        await res.json(tasks);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/newMission', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                let task = new Task({
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category,
                    levelDifficulty: req.body.levelDifficulty,
                    requiredLevel: req.body.requiredLevel,
                    xp: req.body.xp
                });
                await task.save((err, doc)=>{
                    if(err) {
                        console.log(err)
                    }
                    else {
                        res.send(doc);
                    }
                });
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/:id', verifyToken, async (req, res)=>{
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                const task = await Tour.findById(req.params.id);
                await res.json(task);
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/:id', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                Task.findById(req.params.id, (err, task) => {
                    if (err) {
                        console.log(err)
                    } else {
                        task.name = req.body.name;
                        task.category = req.body.category;
                        task.description = req.body.description;
                        task.category = req.body.category;
                        task.levelDifficulty = req.body.levelDifficulty;
                        task.requiredLevel = req.body.requiredLevel;
                        task.xp = req.body.xp;
                        task.save(err => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200)
                            }
                        })
                    }
                })
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.delete('/:id', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            if(authData.role === 'admin') {
                Task.remove({ _id: req.params.id }, err => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        res.sendStatus(200)
                    }
                })
            }
            else {
                await res.json('This is protected page')
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
