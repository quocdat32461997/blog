/* db.js - this script is to set config for DynamoDB and create tables if not existing*/
var aws = require('aws-sdk');
const RecipeModel = require('../models/recipeModel');
const id_generator = require('shortid');
aws.config.update({
	region: "us-east-1",
	endpoint: "http://localhost:8000"
});

var db = new aws.DynamoDB();

/*
* addRecipeIntoDB - function to create recipe document that recipe is designed as following:
*	recipeName - stringe
*	ingredients - list of objects that each is an ingredient
			ingredient - object consistig of multiple attribtues
				-> Name
				-> Amout
	steps - list of strings that describe cookign instrucitons. In future, steps becomes list of paragraphs (string).

*/
exports.addRecipeIntoDB = function(recipeProperties) {
	//TODO: parse json data and add to DynamoDB
	var recipe = recipe_generator(recipeProperties); 
	
}	
/* recipe_generator - function parse recipe properties into json object as the recipeConfig */
var recipe_generator = function(recipe) {
	var id = id_generator.generate();

	//parse ingredients
	var ingredients = ingredient_parser(recipe);
	var steps = step_parser(recipe);

	var recipe = new RecipeModel({
		recipeID: id,
		recipeName: recipe.body.recipename,
		ingredients: {
			ingredientNames: ingredients[0],
			ingredientAmount: ingredients[1]
		},
		steps: steps
	}); 
};

var ingredient_parser = function(recipe) {
	var ingredientNames = recipe.body.ingredientNames.split(',');
	var ingredientAmount = recipe.body.Amount.split(',');

	return [ingredientNames, ingredientAmount];
};

var step_parser = function(recipe) {
	return recipe.body.steps.split(',');
};
