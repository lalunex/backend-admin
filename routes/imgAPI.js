const express = require('express');
const router = express.Router();
const { sqlSearch } = require('../utils/sqlConnect');
const path = require('path');
const multiparty = require('multiparty')

router.post('/', async function(req, res, next) {
  let form = new multiparty.Form();
  // form.uploadDir = path.resolve(__dirname,'../../my_web/dist/otherImgs');
  form.uploadDir = path.resolve(__dirname,'../../../project/front-2-full/dist/otherImgs');
  form.keepExtensions=true;   //是否保留后缀
  form.autoFiels=true;       //启用文件事件，并禁用部分文件事件，如果监听文件事件，则默认为true。
  form.parse(req,function(err,fields,files){  //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
    if(err){
      res.json({
        status:"1",
        msg:"上传失败！"+err
      });
    }else{
      res.json({
        status:"0",
        msg:"上传成功！",
        personPicture: ("http://192.168.0.7:8000"+files.image[0].path.split("dist")[1]).replace('\\', '/')
        // personPicture: ("https://lightliang.top"+files.image[0].path.split("dist")[1]).replace('\\', '/')
      });
    }
  });
});

module.exports = router;