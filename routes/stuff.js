const express = require('express');
const router = express.Router();//su lieu de app.post ou app.get matnt on utilisera router.post ...
const stuffCtrl = require('../controllers/stuff')

router.post('/', stuffCtrl.createThing );
router.put('/:id', stuffCtrl.modifyThing );
router.delete('/:id', stuffCtrl.deleteThing );
router.get('/:id',stuffCtrl.getOneThing);
router.get('/', stuffCtrl.getAllThings);
// poste les likes ou dislikes
// router.post('/:id/like', stuffCtrl.likeThing );
module.exports = router;