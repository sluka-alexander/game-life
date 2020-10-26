const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false,
    },
    levelDifficulty: {
        type: Number,
        required: true,
        default: 1,
    },
    requiredLevel: {
        type: Number,
        required: true,
        default: 1,
    },
    xp: {
        type: Number,
        required: true,
        default: 100,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Tour;
