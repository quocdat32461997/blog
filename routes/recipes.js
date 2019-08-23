const express = require('express');
const router = express.Router();
const path = require('path');

var recipesController = require('../controllers/recipesController');

/* GET writerecipes */
router.get('/', recipesController.renderRecipeForm);

/* POST findrecipesbyname */
router.get('/findrecipesbyname', recipesController.findrecipesbyname);

module.exports = router;
