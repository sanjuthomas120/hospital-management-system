const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    name: { type: String, required: true},
    phone: { type: String, required: true},
    position: { type: String, required: true}
});

const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;