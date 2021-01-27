Pour l'installation:
git clone https://github.com/a-grasso-dev/projet_6.git
puis commande npm i



Démarrage:

Pour le frontend, commande:
  "ng serve". 
 puis se rendre sur:  http://localhost:4200/

Pour le backend, commande:
  "nodemon server". 
 puis se rendre sur:  http://localhost:3000/

 uri pour se connecter:
 dans app.js => rajouter  
 'mongodb+srv://{username}:{password}@cluster0.opz5w.mongodb.net/hotsauce?retryWrites=true&w=majority'
 dans mongoose.connect