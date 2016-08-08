require('dotenv').config();
const PORT = process.env.PORT || 8000;

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Contact = require('./models/contact');

const app = express();

// GENERAL MIDDLEWARE

app.set('view engine', 'ejs');  
app.set('views', './views'); 

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/contacts', require('./routes/contacts'));

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});