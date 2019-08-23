const collectionName = 'recipes';
const path = require('path');

/* renderRecipeForm - function to render the writing-recipe form */
exports.renderRecipeForm = function(req, res) {
	console.log(__dirname);
	res.render('../views/recipes/writerecipes');
};

exports.writerecipes = function(req, res) {
	//connect to database
	
	//insert json data to dynamodb
	
	//notice success
	
	//render the writing-recipe form
	res.render('../views/recipes/writerecipes');
};

exports.findrecipesbyname = async function(req, res) {
};
