const collectionName = 'recipes';
const path = require('path');
const aws = require('aws-sdk');
const RecipeModel = require('../models/recipeModel');
const id_generator = require('shortid');
const table_name = 'Recipes';
const aws_config = require('../dynamodb_config.js');

//configurate aws dynamodb
aws.config.update(aws_config.aws_remote_config);

/*renderRecipeForm - function to render the writing-recipe form */
exports.renderRecipeForm = function(req, res) {
	res.render('../views/recipes/writerecipes');
};

exports.findrecipesbyname = async function(req, res) {
};


/* recipe_generator - function to parse recipe properties into json-object as the recipeModel */
var recipe_generator = function(recipe) {
	var id = id_generator.generate();
	//parse ingredients and steps
	var ingredients = ingredient_parser(recipe);
	var steps = step_parser(recipe);

	//create recipe json object
	console.log(recipe);
	var recipe = {
		'recipeID': id,
		'recipeName': recipe.recipeName,
		'ingredients': {
			'ingredientNames': ingredients[0],
			'ingredientAmount': ingredients[1]
		},
		steps: steps
	};
	return recipe
};

var ingredient_parser = function(recipe) {
	var ingredientNames = recipe.ingredients.split(',');
	var ingredientAmount = recipe.amount.split(',');

	return [ingredientNames, ingredientAmount];
};
var step_parser = function(recipe) {
	return recipe.steps.split(',');
};

exports.writerecipes = function(req, res) {
	//connect to database
	var document = new aws.DynamoDB.DocumentClient();
	var recipe = recipe_generator(req.body);

	//check table exist
	var params = {
		TableName: 'Recipes',
		Item: {
			'recipeID': recipe.recipeID,
			'recipeName': recipe.recipeName,
			'ingredients':recipe.ingredients,
			'steps': recipe.steps
		}
	};

	//print recipe for testing
	//console.log(params);
	
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
	res.render('../views/recipes/writerecipes');
};
