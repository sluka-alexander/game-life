const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const key = require('../keys/keys');
const userRouter = require('../routes/users');
const taskRouter = require('../routes/tasks');

mongoose.set('useCreateIndex', true);

const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 8081;

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers',
        'Authorization, auth-token, Origin, X-Requested-With, Content-Type, Accept, token');
    next();
});

app.use('/user', userRouter);
app.use('/task', taskRouter);

app.get('/', (req,res)=> {
    res.send('welcome');
});

async function start() {
    try {
        await mongoose.connect(key, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        app.listen(port, () => {
            console.log('API STARTED')
        })
    } catch (e) {
        console.log(e)
    }
}
start();
