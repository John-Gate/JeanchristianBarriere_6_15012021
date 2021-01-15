const mongoose = require('mongoose');

//Utilisateur
// Le modèle de données pour un utilisateur est le suivant :
// ● userId: string — identifiant unique MongoDB pour l'utilisateur qui a créé la
// sauce ;
// ● email: string — adresse électronique de l'utilisateur [unique] ;
// ● password: string — hachage du mot de passe de l'utilisateur.


// Le nombre de likes/dislikes et les tableaux like/dislike doivent être mis à jour pour mettre en
// œuvre la fonctionnalité.

const thingSchema = mongoose.Schema({
  //id: ObjectID — identifiant unique créé par MongoDB ;
  userId: { type: String, required: true },// identifiant unique MongoDB pour l'utilisateur qui a créé la sauce object Id qui etait ds la tab user
  name: { type: String, required: true }, // nom de la sauce
  manufacturer:{ type:String, required: true },// fabricant de la sauce
  description: { type: String, required: true },// description de la sauce
  mainPepper: { type: String, required: true },// principal ingrédient dans la sauce
  imageUrl: { type: String, required: true },// string de l'image de la sauce téléchargée par l'utilisateur
  heat: { type: Number, required: true },// nombre entre 1 et 10 décrivant la sauce
  likes: { type:Number, required: true },// nombre d'utilisateurs qui aiment la sauce
  dislikes: { type:Number, required: true },// nombre d'utilisateurs qui n'aiment pas la sauce
  userLiked: { type: String, required: true },// tableau d'identifiants d'utilisateurs ayant aimé la sauce/////////////TABLEAU
  userDisLiked: { type: String, required: true }// tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce./////////////TABLEAU
});

module.exports = mongoose.model('Thing', thingSchema);