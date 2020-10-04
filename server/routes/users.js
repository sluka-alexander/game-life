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
            let token = jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email },
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
                res.json({ user: authData, token: req.token });
            }
        });
    } catch (err) {
        res.sendStatus(500);
    }
});
