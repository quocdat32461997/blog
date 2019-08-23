const express = require('express');
const router = express.Router();
const path = require('path');

var recipesController = require('../controllers/recipesController');

/* GET writerecipes */
router.get('/', recipesController.renderRecipeForm);

/* POST findrecipesbyname */
router.post('/findrecipesbyname', recipesController.findrecipesbyname);

/* POST savenewrecipes */
router.post('/savenewrecipes', recipesController.writerecipes);

module.exports = router;
