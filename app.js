const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
app.set('view,', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

//------------------------------------------------------------------------------
//Initialize Sequelize
//------------------------------------------------------------------------------
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }

});

//------------------------------------------------------------------------------
//Define Sequelize models
//------------------------------------------------------------------------------
const Message = sequelize.define('messages', {
  title: Sequelize.STRING,
  body: Sequelize.STRING
});

//------------------------------------------------------------------------------
//Routing
//------------------------------------------------------------------------------
//Home route - Renders a form to add a new message
app.get('/', (req, res) => {
  res.render('index');
});

//Post route - Adds new messages to the database through Sequelize
app.post('/post', (req, res) => {
  let titleInput = req.body.titleInput;
  let bodyInput = req.body.bodyInput;
  if (titleInput && bodyInput) {
    sequelize.sync().then(() => {
      Message.create({
        title: req.body.titleInput,
        body: req.body.bodyInput
      })
    });
    res.redirect('/');
  } else {
    res.redirect('/');
  }
})


//Show route - Shows the added messages stored in the database
app.get('/messages', (req, res) => {
  Message.findAll()
    .then((allMessages) => {
      res.render('messages', {
        messages: allMessages
      })
    })
})

//------------------------------------------------------------------------------
//Server listening
//------------------------------------------------------------------------------

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
