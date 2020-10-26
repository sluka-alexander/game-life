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
            strength: 50,
            intellect: 60,
            culture: 70,
            charisma: 80,
            humanity: 90,
        }
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

    data: {
        type: Date,
        default: Date.now()
    },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
