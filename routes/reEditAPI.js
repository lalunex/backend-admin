const express = require('express');
const router = express.Router();
const { sqlSearch } = require('../utils/sqlConnect');
const { formatDate } = require('../utils/timeFormat');

router.post('/', async function(req, res, next) {
  if (req.body.id) {
    let articleData = {}
    // 获得文章标签
    let sqlSentence2 = `select label_id from ll_set_article_label where article_id = '${req.body.id}'`
    let labelId = await sqlSearch(sqlSentence2)
    let cardTagNameStr = ''
    articleData.articleContentTags = []
    for(let value of labelId[0]['label_id'].split('-')) {
      let sqlSentence2 = `select label_name from ll_labels where label_id = ${value}`
      let cardTagName = await sqlSearch(sqlSentence2)
      articleData.articleContentTags.push(cardTagName[0]['label_name'])
    }
    // 获得文章内容
    let sqlSentence3 = `select article_id, article_title, article_content from ll_articles where article_id = '${req.body.id}'`
    let articles = await sqlSearch(sqlSentence3)
    articleData.id = articles[0]['article_id']
    articleData.title = articles[0]['article_title']
    articleData.content = articles[0]['article_content']
    // 获得文章种类
    let sqlSentence4 = `select sort_id from ll_set_article_sort where article_id = '${req.body.id}'`
    let sortId = await sqlSearch(sqlSentence4)
    let sqlSentence5 = `select sort_name from ll_sorts where sort_id = '${sortId[0]['sort_id']}'`
    let sortName = await sqlSearch(sqlSentence5)
    articleData.sort = sortName[0]['sort_name']
    await res.json(articleData)
  } else {
    // 插入文章具体信息
    let articlesData = []
  
    let sqlSentence1 = `select article_id, article_title, article_date from ll_articles`
    let articles = await sqlSearch(sqlSentence1)
  
    let flag = !!articles[0]
    for (let value of articles) {
      let obj = {}
      obj.id = value['article_id']
      obj.title = value['article_title']
      obj.date = formatDate(value['article_date'])
      articlesData.push(obj)
    }
    let aData = articlesData.reverse()
    await res.json({
      isDown: flag,
      aData
    })
  }
});

module.exports = router;