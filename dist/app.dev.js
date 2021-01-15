"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var stuffRoutes = require('./routes/stuff');

var userRoutes = require('./routes/user');

var app = express();
mongoose.connect('mongodb+srv://SaucePekocko:XR3YKwxoKuz4qpUh@cluster0.opz5w.mongodb.net/projet6?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connexion à MongoDB réussie !');
})["catch"](function () {
  return console.log('Connexion à MongoDB échouée !');
});
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use('/api/sauces', stuffRoutes); //importes toutes les routes

app.use('/api/auth', userRoutes); //racine de tout ce qui est lie a l authentif

module.exports = app;