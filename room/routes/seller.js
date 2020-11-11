var express = require('express');
var router = express.Router();
//房間列表模組
var roomList = require('../models/roomlist');
/* GET home page. */
router.get('/seller', function(req, res, next) {
  //透過模組取得現有房間資訊，並交給ejs處理
  res.render('seller', { title: '直播o_ob' ,list:roomList.getList()});
});

var roomlist = require('../models/roomlist');
/* GET users listing. */
router.get('seller', function(req, res, next) {
  //取得現有房間列表
  let list = roomlist.getList();
  let response = res
  //根據網址列所帶的參數，取得對應id房間資訊
  let roominfo = list[req.query.id];
  //將資訊透過ejs轉換為html後傳給使用者
  res.render('seller', {
    title: roominfo.name,
    link01: roominfo.test01,
    link02: roominfo.test02,
    rtmp: roominfo.test01 + roominfo.name + roominfo.test02,
  });
});

router.post('seller', function(req, res, next) {
  //取得現有房間列表
  let list = roomlist.getList();
  let response = res
  //房間ID 
  let roomid = req.body.roomname;
  //將資訊傳到房間列表，並將key設為剛剛產生的時間戳
  list[roomid] = {
    name: req.body.roomname,
    link: req.body.rtmplink,
    test01: req.body.rtmp01,
    test02: req.body.rtmp02,
  };
  //將產生的id傳給web，web端將會轉跳到對應頁面
  res.json({
    msg: roomid
  });
});

module.exports = router;
