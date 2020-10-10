const express = require('express');
const router = express.Router();
const { sqlSearch } = require('../utils/sqlConnect');

router.post('/', async function(req, res, next) {
  // 插入文章具体信息
  let flag = true
  await sqlSearch('begin;')
  let articleCurrentId
  if (req.body.id === 0) {
    let sqlSentence5 = `select count(*) from ll_articles`
    let articleId = await sqlSearch(sqlSentence5)
    articleCurrentId = articleId[0]['count(*)'] + 1
  
    let sqlSentence1 = `insert into ll_articles (article_id, article_title, article_content, article_date) values (?, ?, ?, ?)`
    await sqlSearch(sqlSentence1, [articleCurrentId, req.body.title, req.body.content, req.body.date]).catch(() => {
      flag = false
    })
    
    let labelArr = []
    for (let value of req.body.label) {
      let sqlSentence4 = `select label_id from ll_labels where label_name = '${value}'`
      await sqlSearch(sqlSentence4).then(res => {
        labelArr.push(res[0]['label_id'])
      }).catch(() => {
        flag = false
      })
    }
    let sqlSentence2 = `insert into ll_set_article_label (article_id, label_id) values (?, ?)`
    await sqlSearch(sqlSentence2, [articleCurrentId, labelArr.join('-')]).catch(() => {
      flag = false
    })
  
    let articleType = ''
    if (req.body.type === 'Learning') {
      articleType = 1
    } else if (req.body.type === 'Foods & Culture') {
      articleType = 2
    } else {
      articleType = 3
    }
    let sqlSentence3 = `insert into ll_set_article_sort (article_id, sort_id) values (?, ?)`
    await sqlSearch(sqlSentence3, [articleCurrentId, articleType]).catch(() => {
      flag = false
    })
  
    if (flag) {
      await sqlSearch('commit;')
    } else {
      await sqlSearch('rollback;')
    }
    await res.json({ isDown: flag })
  } else {
    articleCurrentId = req.body.id
  
    let sqlSentence6 = `update ll_articles set article_title = '${req.body.title}', article_content = '${req.body.content}', article_date = '${req.body.date}' where article_id = ${articleCurrentId}`
    await sqlSearch(sqlSentence6).catch(() => {
      flag = false
    })
  
    let labelArr = []
    for (let value of req.body.label) {
      let sqlSentence7 = `select label_id from ll_labels where label_name = '${value}'`
      await sqlSearch(sqlSentence7).then(res => {
        labelArr.push(res[0]['label_id'])
      }).catch(() => {
        flag = false
      })
    }
    console.log(flag + '2');
    let sqlSentence8 = `update ll_set_article_label set label_id = '${labelArr.join('-')}' where article_id = '${articleCurrentId}'`
    await sqlSearch(sqlSentence8).catch(() => {
      flag = false
    })
  
    let articleType = ''
    if (req.body.type === 'Learning') {
      articleType = 1
    } else if (req.body.type === 'Foods & Culture') {
      articleType = 2
    } else {
      articleType = 3
    }
    let sqlSentence3 = `update ll_set_article_sort set sort_id = '${articleType}'  where article_id = '${articleCurrentId}'`
    await sqlSearch(sqlSentence3, [articleCurrentId, articleType]).catch(() => {
      flag = false
    })
  
    if (flag) {
      await sqlSearch('commit;')
    } else {
      await sqlSearch('rollback;')
    }
    await res.json({ isDown: flag })
  }
  
  
});

module.exports = router;