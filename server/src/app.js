const express = require('express');
const key = require('../keys/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const port = 3000

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.send('Hello api')
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
