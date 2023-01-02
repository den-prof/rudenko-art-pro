const mongoose = require('mongoose');

const planeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    materials: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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

module.exports = mongoose.model("Plane", planeSchema);