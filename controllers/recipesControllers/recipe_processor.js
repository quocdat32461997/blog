const collectionName = 'recipes';
const path = require('path');
const id_generator = require('shortid');
const RecipeModel = require(path.join(_projdir, 'models/recipeModel'));

/*
recipe_generator - parse moms' input into a json-object to represent a recipe item 
parameters:
	recipeInput - json object from user input
return:
	recipeItem - json object containied parsed info of recipe	
*/
exports.recipe_generator = function(recipeInput) {
	var id = id_generator.generate();
	
	//parse ingredients and steps
	var ingredients = ingredient_parser(recipeInput.ingredients, recipeInput.amount);
	var steps = step_parser(recipeInput.steps);

	//parse recipe-info into recipeItem
	var recipeItem = {
	 	'recipeID': id,
		'recipeName': recipeInput.recipeName,
		'ingredients': {
			'ingredientNames': ingredients[0],
			'ingredientAmount': ingredients[1]
		},
		steps: steps
	}
	return recipeItem
};

/*
ingredient_parser - function to parse ingredients and their amount
paramaeters:
	ingredients - names of ingredients
	amount - amounts of ingredients

return:
	[ingredientNames, ingredientAmount] - a list of pairs of ingredients and amount
*/
function ingredient_parser(ingredients, amounts) {
	var ingredientNames = ingredients.split(',');
	var ingredientAmounts = amounts.split(',');
	return [ingredientNames, ingredientAmounts];
};

/*
step_parser - function to separate steps with delimiter ','
parameters: 
	steps: string of steps
retrurn:
	parsed_steps: a list of steps
*/
function step_parser(steps) {
	return steps.split(',');
};
