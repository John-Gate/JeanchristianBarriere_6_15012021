const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');//accede au path du serveur
const sauceRoutes = require('./routes/sauce'); //router 
const userRoutes = require('./routes/user');//accede aux users



mongoose.connect('',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //'accéder à notre API depuis n'importe quelle origine ( '*' ) 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//envoyer des requêtes avec les méthodes mentionnées ( GET, POST, PUT, DELETE, PATCH, OPTIONS)
  next();
});

app.use(bodyParser.json());
app.use(helmet()); // protection contre injection sql et xms
app.use(mongoSanitize());    // Protection contre les injections dans Mongo Db
app.use('/images', express.static(path.join(__dirname, 'images')));//indique a express qu il faut gerer la ressource de maniere statiqueun sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/api/sauces', sauceRoutes); //importes toutes les routes pour toutes demande effectues, evite repetition 
app.use('/api/auth', userRoutes); //racine de tout ce qui est lie a l authentif, evite repetition 

module.exports = app;