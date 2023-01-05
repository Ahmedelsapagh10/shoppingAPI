const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true },
    phone: { type: String, required: true },
})

module.exports = mongoose.model('User', UserSchema)