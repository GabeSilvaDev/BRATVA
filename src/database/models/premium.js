const { Schema, model } = require('mongoose')

const NewPremium = new Schema ({
    User: String,
})

module.exports = model('premium', NewPremium)