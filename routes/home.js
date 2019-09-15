var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');

/* GET home page */
router.get('/', homeController.displayRecipesInHomePage);

/* GET display more recipes */
router.get('/morerecipes', homeController.displayMoreRecipes);

/* GET display about page */
router.get('/about', homeController.displayAboutPage);

/* GET display a recipe */
router.get('/displayarecipe', homeController.displayarecipe);

module.exports = router;
