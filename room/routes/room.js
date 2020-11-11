var express = require('express');
var router = express.Router();
//房間列表模組
var roomlist = require('../models/roomlist');
var User = require('../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  //取得現有房間列表
  let list = roomlist.getList();
  //根據網址列所帶的參數，取得對應id房間資訊
  let roominfo = list[req.query.id];
  //將資訊透過ejs轉換為html後傳給使用者
  res.render('room', {
    title: roominfo.name,
    link01: roominfo.test01,
    link02: roominfo.test02,
    rtmp: roominfo.test01 + roominfo.name + roominfo.test02,
    chatname: req.user.username
  });
});

router.post('/', function(req, res, next) {
  //取得現有房間列表
  let list = roomlist.getList();
  //房間ID
  let roomid = req.body.roomname;
  
  list[roomid] = {
    name: req.body.roomname,
    test01: req.body.rtmp01,
    test02: req.body.rtmp02,
    
  };
  //將產生的id傳給web，web端將會轉跳到對應頁面
  res.json({
    msg: roomid
  });
});

module.exports = router;
