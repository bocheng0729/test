const mongoose = require('mongoose')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'error：'))
db.once('open', (callback) => {
  console.log('Success！')
})

const classSchema = new mongoose.Schema({
    Pname: String,
    moneyId: Number,
    dataname: String,
    image: String
})

const comModel = mongoose.model('newClass', classSchema)

module.exports = comModel