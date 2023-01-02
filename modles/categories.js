const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    tab: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Category", categorySchema);