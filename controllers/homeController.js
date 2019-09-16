const aws = require('aws-sdk');
const path = require('path');
const aws_config = require('../dynamodb_config.js');
var recipeCount = 0;
var last_key = null;

//Configure aws dynamodb
aws.config.update(aws_config.aws_remote_config);
const document = new aws.DynamoDB.DocumentClient();

/*
* displayRecipesInHomePage - function to query recipes and display recipes in home page
*/
exports.displayRecipesInHomePage = async function(req, res) {
	//params - store TableName and Limit number of recipes displayed to screen
	var params = {
		TableName: aws_config.aws_table_name,
		Limit:3 
	}
	
	//scan the first 3 items and render to screen
	//save the LastEvaluatedKey to last_key for displayMoreRecipes funciton below
	document.scan(params, function(err, data) {
		if(err) console.log(err);
		else {
			console.log("Query succeeded");
			last_key = data.LastEvaluatedKey; //save LastEvaluatedKey
			res.render('index', {"recipes":data.Items}); //render	
		}
	});
};

/*
* displayMoreRecipes - function to query next 3 recipes and display more recipes in home page
*/
exports.displayMoreRecipes = async function(req, res) {
	//params - store TableName and ExclusiveStartKey and Limit Number of items get scanned	
	var params = {
		TableName: aws_config.aws_table_name,
		Limit: 3,
		ExclusiveStartKey: last_key
	}

	//scan next 3 parameters and render info of these 3 recipes	
	//save the LastEvaluatedKey
	document.scan(params, function(err, data) {
		if(err) console.log(err);
		else {
			//console.log(data.Items);
			last_key = data.LastEvaluatedKey; //update LastEvaluatedKey
			res.render('index', {"recipes":data.Items});	//render recipes
		}
	});
};

/*
*displayAboutPage - function to display About page
*/
exports.displayAboutPage = async function(req, res) {
	res.render('about');
};

/*
* displayarecipe - function to display one recipe
*/
exports.displayarecipe = async function(req, res) {
	//params - store TableName to query the recipe
	var params = {
		TableName: aws_config.aws_table_name,
		KeyConditionExpression: '#id = :id',
		ExpressionAttributeNames: {
			'#id': 'recipeID'
		},
		ExpressionAttributeValues: {
			':id':req.query.id
		}
	}

	//query the recipe and render the recipe info	
	document.query(params, function(err, data) {
		if(err) console.log(err);
		else {
			console.log("Query succeeded");
			console.log(data.Items[0].ingredients.ingredients);
			res.render(path.join(_projdir, 'views/recipes/recipe'), {'recipe':data.Items[0]});
		}
	});
};

/*
*findrecipesbyname - function to query recipe from parameters
*/
exports.findrecipesbyname = async function(req, res) {
	//params - store TablleName and to parse parameters to query recipes
	var params = {
		TableName: aws_config.aws_table_name, 
		FilterExpression: "contains(#rename,:recipename)",	
		ExpressionAttributeNames: {
			'#rename':'recipeName'
		},
		ExpressionAttributeValues: {
			':recipename':req.query.recipename.toLowerCase()
		}
	}

	//scan data to find recipes satisfied by recipename
	document.scan(params, function(err, data) {
		if(err) console.log(err);
		else {
			console.log("Scanning succeeded");
			res.render(path.join(_projdir, 'views/home/recipe_search.pug'), {'recipes':data.Items});
		}
	});
};
