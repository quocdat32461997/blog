const SchemaObject = require('schema-object');

var IngredientModel = new SchemaObject({
	ingredientNames: {type: Array, arrayType: {type: String, minLength: 1}},
	ingredientAmount: {type: Array, arrayType: {type: String, minLength: 1}},
});

var Recipe = new SchemaObject({
	recipeID: String,
	recipeName: String,
	ingredients: IngredientModel,
	steps: {type: Array, arrayType: {type: String, minLength: 1}}
 
});

module.exports = Recipe;
