const comModel = require('../models/my_com')
const cartModel = require('../models/my_cart')
const User = require('../models/user')
var express = require('express');
var router = express.Router();
//商品列表
router.get('/cart', (req, res, next) => {
    let response = res
    comModel.find({dataname:req.user.username}, (err, result, res) => {
        if(err) return console.log(err)
        response.render('cart', { result })
    })
})
//添加商品到購物車

router.post('/cart', (req, res, next) => {
    console.log(req.body)
    
    let num = req.body.num,
        condiction = {_id: req.body._id[num]},
        
        buyercart = [{
        Pname: req.body.Pname[num],
        moneyId: req.body.money_id[num],
        dataname: req.user.username
    }]       
    cartModel.create(buyercart, (err) => {
        if(err) return console.log(err)
        res.redirect('/cart/cart')
    })
})
router.get('/carts', (req, res, next) => {
    let response = res
    cartModel.find({dataname:req.user.username}, (err, result, res) => {
        if(err) return console.log(err)
        response.render('carts', { result })
    })
})

router.post('/carts', (req, res, next) => {
    cartModel.remove({_id: req.body.carts}, (err, result) => {
        if(err) return console.log(err)
        console.log(result.result)
        res.redirect('/cart/carts')
    })
})
module.exports = router;