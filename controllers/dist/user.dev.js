"use strict";

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var User = require('../models/User'); //fct signup qui va cryupter mdp, va cree un nouveau ux avec ce mdp et l email, et enregistre ux


exports.signup = function (req, res, next) {
  bcrypt.hash(req.body.password, 10) //on appel bcrypt.hash la fct, on passe le mdp avec req.body.password, on fait 10 tours de hashage(plus on en fait plus c est long, ici suffisant)
  .then(function (hash) {
    var user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(function () {
      return res.status(201).json({
        message: "utilisateur créé"
      });
    }).then["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
    ;
  })["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
}; //permet aux ux de se connecter a l app, on reccup l ux de la base === email, si pas bon on renvoit erreur, on compare mdp avec l ehash si comparaison pas bonne on renvoit erreur, si ok on renvoituser id et token


exports.login = function (req, res, next) {
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(401).json({
        error: 'utilisateur non trouvé !'
      });
    }

    bcrypt.compare(req.body.password, user.password).then(function (valid) {
      if (!valid) {
        return res.status(401).json({
          error: 'mot de passe incorrect !'
        }); // on a trouvé l ux mais comparaison a retourne false
      }

      res.status(200).json({
        userID: user._id,
        token: jwt.sign({
          userId: user._id
        }, //payload :donnes qu on veut encoder
        'RANDOM_TOKEN_SECRET', {
          expiresIn: '24h'
        })
      });
    })["catch"](function (error) {
      return req.status(500).json({
        error: error
      });
    });
  })["catch"](function (error) {
    return req.status(500).json({
      error: error
    });
  });
};