const express = require('express');
const router = express.Router();
const { sqlSearch } = require('../utils/sqlConnect');

router.post('/', async function(req, res, next) {
  if (req.body.id && req.body.name && req.body.web) {
    console.log([req.body.id, req.body.name, req.body.web]);
    let sqlSentence2 = `insert into ll_friends (friends_id, friends_name, friends_web) values (?, ?, ?)`
    await sqlSearch(sqlSentence2, [req.body.id, req.body.name, req.body.web]).then(() => {
      res.json({ isDown: true })
    }).catch(() => {
      res.json({ isDown: false })
    })
  } else if (req.body.id) {
    console.log(req.body.id);
    let sqlSentence3 = `delete from ll_friends where friends_id = ${req.body.id}`
    await sqlSearch(sqlSentence3).then(() => {
      res.json({ isDown : true })
    }).catch(() => {
      res.json({ isDown : false })
    })
  } else {
    const friendsObj = []
    // 获得朋友具体信息
    let sqlSentence1 = `select * from ll_friends`
    let friendsContent = await sqlSearch(sqlSentence1)
    // 获得朋友的具体内容
    for(let item of friendsContent) {
      // 获得朋友主体内容
      let friendObj = {}
      friendObj.friendId = item['friends_id']
      friendObj.friendname = item['friends_name']
      friendObj.friendweb = item['friends_web']
      friendsObj.push(friendObj)
    }
    await res.json(friendsObj)
  }
});

module.exports = router;