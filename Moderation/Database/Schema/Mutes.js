const mongoose = require("mongoose");

const schema = mongoose.model('Mute', new mongoose.Schema({
    No: Number,
    _id: String,
    Kalkma: String
}));

module.exports = schema;
