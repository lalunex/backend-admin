const express = require('express');
const router = express.Router();
const { sqlSearch } = require('../utils/sqlConnect');

router.post('/', async function(req, res, next) {
  // 获得用户信息
  let sqlSentence1 = `select count(*) from ll_user where user_username = '${req.body.username}' and user_password = '${req.body.password}'`
  let user = await sqlSearch(sqlSentence1)
  if (user[0]['count(*)']) {
    await res.json({ isLogin: true })
  } else {
    await res.json({ isLogin: false })
  }
});

module.exports = router;