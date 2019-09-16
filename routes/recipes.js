const express = require('express');
const router = express.Router();
const path = require('path');

var recipesController = require('../controllers/recipesControllers/recipesController');

/* GET writerecipes */
router.get('/', recipesController.renderRecipeForm);

/* POST savenewrecipes */
router.post('/savenewrecipes', recipesController.writerecipes);

module.exports = router;
