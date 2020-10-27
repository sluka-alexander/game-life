const express =require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken')

module.exports = router;

router.post('/register', async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            newUser.save(() => {
                return res.status(200).json({
                    title: 'Success'
                })
            })
        } else {
            return res.status(500).json({
                message: 'This email is already there',
                err: err,
            });
        }
    });
});
router.post('/login', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) {
            return res.status(500).json({
                title: 'server error',
                error: err,
            })
        }
        if(!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        else {
            let token = jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email,
                    skills: user.skills, habits: user.habits, tasks: user.tasks, daily: user.daily, awards: user.awards },
                'secretKey', { expiresIn: 86400 });
            res.status(200).header('auth-token', token).send({ auth: true, token: token, user: user });
        }
    });
});

router.post('/userData', verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        res.json({ user: user, token: req.token });
                    }
                });

            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/newTask', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        let task = {
                            name: req.body.name,
                            description: req.body.desc,
                            difficulty: req.body.difficulty,
                            category: req.body.category,
                            price: req.body.price,
                            xp: req.body.xp,
                            skills: req.body.skills,
                            task_id: String(Date.now())
                        }
                        user.tasks.push(task);
                        user.save(err => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200)
                            }
                        })
                    }
                });
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/deleteTask', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        let positionTask = 0;
                        for (let i = 0; i < user.tasks.length; i++) {
                            if(user.tasks[i].task_id === req.body.id) {
                                positionTask = i;
                            }
                        }
                        user.tasks.splice(positionTask, 1);
                        user.save(err => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200)
                            }
                        })
                    }
                });
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put('/updateTask', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        let positionTask = 0;
                        let task = {
                            name: req.body.name,
                            description: req.body.desc,
                            difficulty: req.body.difficulty,
                            category: req.body.category,
                            price: req.body.price,
                            xp: req.body.xp,
                            skills: req.body.skills,
                            task_id: req.body.taskId,
                        }
                        for (let i = 0; i < user.tasks.length; i++) {
                            if(user.tasks[i].task_id === req.body.taskId) {
                                positionTask = i;
                            }
                        }
                        user.tasks.splice(positionTask, 1, task);
                        user.save(err => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200)
                            }
                        })
                    }
                });
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});
