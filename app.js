const history = require('connect-history-api-fallback');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const loginAPI = require('./routes/loginAPI');
const friendsAPI = require('./routes/friendsAPI');
const contactAPI = require('./routes/contactAPI');
const commentsAPI = require('./routes/commentsAPI');
const articleAPI = require('./routes/articleAPI');
const imgAPI = require('./routes/imgAPI');
const labelsAPI = require('./routes/labelsAPI');
const reEditAPI = require('./routes/reEditAPI');

const app = express();

app.use(cors({
  origin: ["*"],
  methods: ['GET', 'POST']
}));
//跨域问题解决方面
app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(cookieParser());
app.use(history({
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: function (context) {
        return context.parsedUrl.path
      }
    }
  ]
}));
app.use(express.static(path.join(__dirname, '../../project/front-2-full/dist')));
// app.use(express.static(path.join(__dirname, './dist')));

app.use('/api/admin', loginAPI);
app.use('/api/friends', friendsAPI);
app.use('/api/contact', contactAPI);
app.use('/api/comments', commentsAPI);
app.use('/api/article', articleAPI);
app.use('/api/img', imgAPI);
app.use('/api/labels', labelsAPI);
app.use('/api/reedit', reEditAPI);

app.use(function(err, req, res, next) {
  res.send('error');
});

app.listen(8000, () => {
  console.log('8000端口已打开');
})
