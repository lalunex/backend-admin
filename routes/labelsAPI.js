const express = require('express');
const router = express.Router();
const { sqlSearch } = require('../utils/sqlConnect');

router.post('/', async function(req, res, next) {
  // 获得标签信息
  let obj = []
  let sqlSentence1 = `select label_name from ll_labels`
  let user = await sqlSearch(sqlSentence1)
  for(let value of user) {
    obj.push(value['label_name'])
  }
  await res.json(obj)
});

module.exports = router;