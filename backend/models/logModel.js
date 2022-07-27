
const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    technician: {
        type: String,
        required: true
    },
    attention: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Log", LogSchema);