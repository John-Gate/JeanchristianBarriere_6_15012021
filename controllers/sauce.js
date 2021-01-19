const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes:0,
    dislikes:0,
    usersLiked:[],
    usersDisliked:[]
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce=(req, res, next)=>{
  Sauce.findOne({_id :req.params.id})
  .then((sauce) => res.status(200).json(sauce))
  .catch((error) => res.status(404).json({error:error})
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) =>{
  Sauce.find()
  .then((sauces)=> res.status(200).json(sauces))
  .catch((error) => res.status(400).json({error}));
};

//Définit le statut"j'aime" pour userIDfourni.
// Si j'aime = 1,l'utilisateur aime lasauce. 
//Si j'aime = 0,l'utilisateur annule cequ'il aime ou ce qu'iln'aime pas. 
//Si j'aime =-1, l'utilisateur n'aimepas la sauce.
//L'identifiant del'utilisateur doit êtreajouté ou supprimé dutableau approprié, engardant une trace deses préférences et enl'empêchant d'aimer oude ne pas aimer lamême sauce plusieursfois. Nombre total de"j'aime" et de "je n'aimepas" à mettre à jour avec chaque "j'aime".
// Le nombre de likes/dislikes et les tableaux like/dislike doivent être mis à jour pour mettre en
// œuvre la fonctionnalité.
exports.likeSauce = (req, res, next) =>{
  if(req.body.like ==1){
    Sauce.updateOne({_id: req.params.id}, {$inc:{likes:1}, $push:{usersLiked:req.body.userId },_id:req.params.id } )//c est l id qu on va modifie
    .then(sauces=> res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
  }else if(req.body.like ==-1){
    Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:1}, $push:{usersDisliked:req.body.userId },_id:req.params.id } )
    .then(sauces=> res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
  }else if(req.body.like ==0){
    Sauce.findOne({_id: req.params.id})
    .then(sauces=> {
      if(sauces.usersLiked.find(user=> user===req.body.userId)){
        Sauce.updateOne({_id: req.params.id}, {$inc:{likes:-1}, $pull:{usersLiked:req.body.userId },_id:req.params.id } )
        .then(sauces=> res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
      }
      if(sauces.usersDisliked.find(user=> user===req.body.userId)){
        Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes:-1}, $pull:{usersDisliked:req.body.userId },_id:req.params.id } )
        .then(sauces=> res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
      }
    })
    .catch(error=>console.log(error));
  }
}