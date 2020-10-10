const express = require('express');
const router = express.Router();
const { sqlSearch } = require('../utils/sqlConnect');
const { formatDate } = require('../utils/timeFormat');

router.post('/', async function(req, res, next) {
  // 获得标签信息
  if (req.body.id) {
    let sqlSentence3 = `delete from ll_comments where comment_id = ${req.body.id}`
    await sqlSearch(sqlSentence3).then(() => {
      res.json({ isDown : true })
    }).catch(() => {
      res.json({ isDown : false })
    })
  } else {
    let obj = []
    let sqlSentence1 = `select * from ll_comments where article_id != 0`
    let comments = await sqlSearch(sqlSentence1)
    for(let item of comments) {
      let sqlSentence2 = `select article_title from ll_articles where article_id = ${item['article_id']}`
      let title = await sqlSearch(sqlSentence2)
      obj.push({
        username: item['comment_username'],
        useremail: item['comment_useremail'],
        article: title[0]['article_title'],
        content: item['comment_content'],
        date: formatDate(item['comment_date']),
        commentId: item['comment_id']
      })
    }
    await res.json(obj)
  }
});

module.exports = router;