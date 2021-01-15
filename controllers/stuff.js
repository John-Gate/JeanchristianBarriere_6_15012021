const thing = require('../models/Thing');
exports.createThing =(req,res,next)=>{
  delete req.body._id;
  const thing = new Thing({
    ...req.body //raccourci spread
  });
  thing.save()
  .then(()=>res.status(201).json({message:"Objet Enregistre!"}))
  .catch(error=> res.status(400).json({ error })); // equivalent de error: error
};

exports.modifyThing=(req,res,next)=>{
  Thing.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
  .then(()=>res.status(200).json({message:'objet modifie!'}))
  .catch(error => res.status(400).json({ error }));
 };

 exports.deleteThing=(req, res, next)=>{
  Thing.deleteOne({_id:req.params.id})
  .then(() =>res.status(200).json({message:"objet supprime!"}))
  .catch(error=> res.status(400).json({error}));
 };

 exports.getOneThing=(req, res, next)=>{// les : montrent a express que la route est dynamique
  Thing.findOne({_id :req.params.id})
  .then(thing => res.status(200).json(thing))
  .catch(error => res.status(400).json({error}));
};

exports.getAllThings = (req, res, next) =>{
  Thing.find()
  .then(things=> res.status(200).json(things))
  .catch(error => res.status(400).json({error}));
};

////////POST LES LIKES OU DISLIKS
// exports.likeThing=(req,res,next)=>{
//   delete req.body._id;
//   const thing = new Thing({
//     ...req.body 
//   });
//   thing.save()
//   .then(()=>res.status(201).json({message:"Objet Enregistre!"}))
//   .catch(error=> res.status(400).json({ error })); 
// };