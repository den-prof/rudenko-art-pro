const mongoose = require('mongoose');

const painterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    planeImage: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Painter", painterSchema);