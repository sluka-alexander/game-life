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

router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ xp: - 1 });
        res.json({ users: users });
    } catch (err) {
        res.sendStatus(500);
    }
});


router.put('/new', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        switch (req.body.type) {
                            case "Task":
                            let task = {
                                name: req.body.name,
                                description: req.body.desc,
                                difficulty: req.body.difficulty,
                                category: req.body.category,
                                price: req.body.price,
                                xp: req.body.xp,
                                skills: req.body.skills,
                                isActive: false,
                                task_id: String(Date.now())
                            }
                            user.tasks.push(task);
                            break;
                            case "Habit":
                            let habit = {
                                name: req.body.name,
                                description: req.body.desc,
                                difficulty: req.body.difficulty,
                                typeHabit: req.body.typeHabit,
                                category: req.body.category,
                                price: req.body.price,
                                xp: req.body.xp,
                                skills: req.body.skills,
                                habit_id: String(Date.now())
                            }
                            user.habits.push(habit);
                            break;
                            case "Daily":
                                let daily = {
                                    name: req.body.name,
                                    description: req.body.desc,
                                    difficulty: req.body.difficulty,
                                    category: req.body.category,
                                    price: req.body.price,
                                    xp: req.body.xp,
                                    skills: req.body.skills,
                                    isActive: false,
                                    daily_id: String(Date.now())
                                }
                                user.daily.push(daily);
                                break;
                            case "Award":
                                let award = {
                                    name: req.body.name,
                                    description: req.body.desc,
                                    price: req.body.price,
                                    award_id: String(Date.now())
                                }
                                user.awards.push(award);
                                break;
                        }
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

router.put('/delete', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        let position = 0;
                        switch (req.body.type) {
                            case "Task":
                                for (let i = 0; i < user.tasks.length; i++) {
                                    if(user.tasks[i].task_id === req.body.idElement) {
                                        position = i;
                                    }
                                }
                                user.tasks.splice(position, 1);
                                break;
                            case "Habit": {
                                for (let i = 0; i < user.habits.length; i++) {
                                    if(user.habits[i].habit_id === req.body.idElement) {
                                        position = i;
                                    }
                                }
                                user.habits.splice(position, 1);
                                break;
                            }
                            case "Daily":
                                for (let i = 0; i < user.daily.length; i++) {
                                    if(user.daily[i].daily_id === req.body.idElement) {
                                        position = i;
                                    }
                                }
                                user.daily.splice(position, 1);
                                break;
                            case "Award":
                                for (let i = 0; i < user.awards.length; i++) {
                                    if(user.awards[i].award_id === req.body.idElement) {
                                        position = i;
                                    }
                                }
                                user.awards.splice(position, 1);
                                break;
                        }
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

router.put('/update', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        let position = 0;
                        switch (req.body.type) {
                            case "Task":
                                let task = {
                                    name: req.body.name,
                                    description: req.body.desc,
                                    difficulty: req.body.difficulty,
                                    category: req.body.category,
                                    price: req.body.price,
                                    xp: req.body.xp,
                                    skills: req.body.skills,
                                    habit__id: req.body.habitId,
                                }
                                for (let i = 0; i < user.tasks.length; i++) {
                                    if(user.tasks[i].task_id === req.body.taskId) {
                                        position = i;
                                    }
                                }
                                user.tasks.splice(position, 1, task);
                                break;
                            case "Habit":
                                let habit = {
                                    name: req.body.name,
                                    description: req.body.desc,
                                    difficulty: req.body.difficulty,
                                    typeHabit: req.body.typeHabit,
                                    category: req.body.category,
                                    price: req.body.price,
                                    xp: req.body.xp,
                                    skills: req.body.skills,
                                    habit_id: req.body.habitId,
                                }
                                for (let i = 0; i < user.habits.length; i++) {
                                    if(user.habits[i].habit_id === req.body.habitId) {
                                        position = i;
                                    }
                                }
                                user.habits.splice(position, 1, habit);
                                break;
                            case "Daily":
                                let daily = {
                                    name: req.body.name,
                                    description: req.body.desc,
                                    difficulty: req.body.difficulty,
                                    category: req.body.category,
                                    price: req.body.price,
                                    xp: req.body.xp,
                                    skills: req.body.skills,
                                    daily_id: req.body.dailyId,
                                }
                                for (let i = 0; i < user.daily.length; i++) {
                                    if(user.daily[i].daily_id === req.body.dailyId) {
                                        position = i;
                                    }
                                }
                                user.daily.splice(position, 1, daily);
                                break;
                            case "Award":
                                let award = {
                                    name: req.body.name,
                                    description: req.body.desc,
                                    price: req.body.price,
                                    award_id: req.body.awardId,
                                }
                                for (let i = 0; i < user.awards.length; i++) {
                                    if(user.awards[i].award_id === req.body.awardId) {
                                        position = i;
                                    }
                                }
                                user.awards.splice(position, 1, award);
                                break;
                            }
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

router.put('/complete', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        let positionTask =0
                        switch (req.body.type) {
                            case 'habit':
                                if(req.body.action === 'increase') {
                                    user.xp += req.body.xp
                                    user.skills = {
                                        str: Number( user.skills.str + req.body.skills.str),
                                        int: Number( user.skills.int + req.body.skills.int),
                                        cul: Number( user.skills.cul + req.body.skills.cul),
                                        cha: Number( user.skills.cha + req.body.skills.cha),
                                        hum: Number( user.skills.hum + req.body.skills.hum),
                                    }
                                    user.money += req.body.money
                                }
                                else {
                                    user.xp -= req.body.xp
                                    user.skills = {
                                        str: Number(user.skills.str - req.body.skills.str),
                                        int: Number(user.skills.int - req.body.skills.int),
                                        cul: Number(user.skills.cul - req.body.skills.cul),
                                        cha: Number(user.skills.cha - req.body.skills.cha),
                                        hum: Number(user.skills.hum - req.body.skills.hum),
                                    }
                                    user.money -= req.body.money
                                }
                                break;
                            case 'task':
                                for (let i = 0; i < user.tasks.length; i++) {
                                    if(user.tasks[i].task_id === req.body.taskId) {
                                        positionTask = i;
                                    }
                                }
                                let task = {
                                    name: user.tasks[positionTask].name,
                                    description: user.tasks[positionTask].description,
                                    difficulty: user.tasks[positionTask].difficulty,
                                    category: user.tasks[positionTask].category,
                                    price: user.tasks[positionTask].price,
                                    xp: user.tasks[positionTask].xp,
                                    skills: user.tasks[positionTask].skills,
                                    isActive: !req.body.isActive,
                                    task_id: req.body.taskId,
                                }
                                user.tasks.splice(positionTask, 1, task);
                                if(!req.body.isActive) {
                                    user.xp += req.body.xp
                                    user.skills = {
                                        str: Number(user.skills.str + req.body.skills.str),
                                        int: Number(user.skills.int + req.body.skills.int),
                                        cul: Number(user.skills.cul + req.body.skills.cul),
                                        cha: Number(user.skills.cha + req.body.skills.cha),
                                        hum: Number(user.skills.hum + req.body.skills.hum),
                                    }
                                    user.money += req.body.money
                                }
                                if(req.body.isActive) {
                                    user.xp -= req.body.xp
                                    user.skills = {
                                        str: Number(user.skills.str - req.body.skills.str),
                                        int: Number(user.skills.int - req.body.skills.int),
                                        cul: Number(user.skills.cul - req.body.skills.cul),
                                        cha: Number(user.skills.cha - req.body.skills.cha),
                                        hum: Number(user.skills.hum - req.body.skills.hum),
                                    }
                                    user.money -= req.body.money
                                }
                                break;
                            case 'daily':
                                for (let i = 0; i < user.daily.length; i++) {
                                    if(user.daily[i].daily_id === req.body.dailyId) {
                                        positionTask = i;
                                    }
                                }
                                let daily = {
                                    name: user.daily[positionTask].name,
                                    description: user.daily[positionTask].description,
                                    difficulty: user.daily[positionTask].difficulty,
                                    category: user.daily[positionTask].category,
                                    price: user.daily[positionTask].price,
                                    xp: user.daily[positionTask].xp,
                                    skills: user.daily[positionTask].skills,
                                    isActive: true,
                                    daily_id: user.daily_id,
                                    toDate: Date.now() + 15000,
                                }
                                user.daily.splice(positionTask, 1, daily);
                                if(!req.body.isActive) {
                                    user.xp += req.body.xp
                                    user.skills = {
                                        str: Number(user.skills.str + req.body.skills.str),
                                        int: Number(user.skills.int + req.body.skills.int),
                                        cul: Number(user.skills.cul + req.body.skills.cul),
                                        cha: Number(user.skills.cha + req.body.skills.cha),
                                        hum: Number(user.skills.hum + req.body.skills.hum),
                                    }
                                    user.money += req.body.money
                                }
                                break;
                            case 'award':
                                user.money -= req.body.price
                                break;
                        }
                        if(user.money < 0) {
                            user.money = 0;
                        }
                        if(user.xp < 0) {
                            user.xp = 0;
                        }
                        if(user.skills.str < 0) {
                            user.skills.str = 0;
                        }
                        if(user.skills.int < 0) {
                            user.skills.int = 0;
                        }
                        if(user.skills.cul < 0) {
                            user.skills.cul = 0;
                        }
                        if(user.skills.cha < 0) {
                            user.skills.cha = 0;
                        }
                        if(user.skills.hum < 0) {
                            user.skills.hum = 0;
                        }
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


router.put('/updateLevel', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {
                        user.level = req.body.level;
                        user.save(err => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.json({level: user.level})
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

router.put('/checkDaily', verifyToken, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretKey', async (err, authData) => {
            if(err) {
                res.sendStatus(403);
            }
            else {
                const email = authData.email;
                User.findOne({ email: email }, (err, user) => {
                    if(user) {

                        user.daily.forEach((el)=> {
                            if(el.toDate < Date.now()) {
                                let daily = {
                                    name: el.name,
                                    description: el.description,
                                    difficulty: el.difficulty,
                                    category: el.category,
                                    price: el.price,
                                    xp: el.xp,
                                    skills: el.skills,
                                    isActive: false,
                                    daily_id: user.daily_id,
                                    toDate: null,
                                }
                                user.daily.splice(el, 1, daily);
                            }
                        })
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
