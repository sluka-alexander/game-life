const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'regular',
        required: true
    },
    skills: {
        type: Object,
        default: {
            str: 0,
            int: 0,
            cul: 0,
            cha: 0,
            hum: 0,
        }
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },

    tasks: {
      type: Array,
      default: []
    },

    habits: {
        type: Array,
        default: []
    },

    awards: {
        type: Array,
        default: []
    },

    daily: {
        type: Array,
        default: []
    },
    money: {
        type: Number,
        default: 0
    },

    data: {
        type: Date,
        default: Date.now()
    },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
