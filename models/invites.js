const mongoose = require('mongoose')
const { Schema } = mongoose; 

const inviteSchema = new Schema({
    ip: String,
    port: Number,
    slug: String,
    destination: String,
})

const Invite = mongoose.model('invite',inviteSchema);
module.exports = Invite;