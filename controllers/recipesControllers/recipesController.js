const collectionName = 'recipes';
const path = require('path');
const aws = require('aws-sdk');
const RecipeModel = require(path.join(_projdir, 'models/recipeModel'));
const id_generator = require('shortid');
const table_name = 'Recipes';
const aws_config = require(path.join(_projdir, 'dynamodb_config.js'));
const recipe_processor = require('./recipe_processor.js');

//configurate aws dynamodb
aws.config.update(aws_config.aws_remote_config);

/*renderRecipeForm - function to render the writing-recipe form */
exports.renderRecipeForm = function(req, res) {
	res.render(path.join(_projdir, 'views/recipes/writerecipes'));
};

exports.findrecipesbyname = async function(req, res) {

};

exports.writerecipes = function(req, res) {
	//connect to database
	var document = new aws.DynamoDB.DocumentClient();
	var recipe = recipe_processor.recipe_generator(req.body);

	//check table exist
	var params = {
		TableName: 'Recipes',
		Item: {
			'recipeID': recipe.recipeID,
			'title':recipe.title,
			'recipeName': recipe.recipeName,
			'ingredients':recipe.ingredients,
			'steps': recipe.steps
		}
	};

	//Put recipe into Recipes table
	document.put(params, function(err, data) {
		if(err) {
			console.error("Unable to add recipe", err);
		}
		else {
			console.log("Successfully put item into DynamoDB");
		}
	});

	//render the writing-recipe form
	res.render(path.join(_projdir, 'views/recipes/writerecipes'));
};
