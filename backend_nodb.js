var express = require('express');
var app = express();
import { Sequelize, DataTypes } from 'sequelize';

let comments = []; // define a list to store values. DB in this practice.

// For parsing application/json
app.use(express.json());


const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

const jane = await User.create({
  username: 'janedoe',
  birthday: new Date(1980, 6, 20),
});

const users = await User.findAll();

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  // const comments = await Comment,findAll();
  
  res.render('frontend_db', {comments: comments}); // object transferred to frontend (key, value)
});

app.get('/comment', function(req, res) {
  console.log(req.query)
  res.send('get method')
});

app.post('/comment', function(req, res) {
  // console.log(req.body)
  const comment = req.body.comment
  comments.push(comment)
  console.log(comments)
  // res.send('post method')
  res.redirect('/')
});

async function myFunction() {
  await comments.sync();
  console.log('the table was created')
}
myFunction();

app.listen(3000);
console.log('Server is listening on port 3000');






