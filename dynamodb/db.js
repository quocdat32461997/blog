/* db.js - this script is to set config for DynamoDB and create tables if not existing*/
var aws = require('aws-sdk');
var recipeConfig = require('recipeConfig.js');
aws.config.update({
	region: "us-east-1",
	endpoint: "http://localhost:8000"
});

var db = aws.DynamoDB();

/*
* createRecipes - function to create recipe document that recipe is designed as following:
*	recipeName - stringe
*	ingredients - list of objects that each is an ingredient
			ingredient - object consistig of multiple attribtues
				-> Name
				-> Amout
	steps - list of strings that describe cookign instrucitons. In future, steps becomes list of paragraphs (string).

*/
exports.createRecipes = function(recipeName, configs, attributes) {
	//TODO: parse json data and add to DynamoDB
}	

