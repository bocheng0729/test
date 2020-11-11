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

const cartModel = mongoose.model('newCart', classSchema)

module.exports = cartModel