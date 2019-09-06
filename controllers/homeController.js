const aws = require('aws-sdk');
const aws_config = require('../dynamodb_config.js');
var recipeCount = 0;
const last_key = null;

//Configure aws dynamodb
aws.config.update(aws_config.aws_remote_config);
/*
* displayRecipesInHomePage - function to query recipes and display recipes in home page
*/
exports.displayRecipesInHomePage = async function(req, res) {
	var document = new aws.DynamoDB.DocumentClient();
	var params = {
		TableName: aws_config.aws_table_name,
		Limit:3 
	}
	var queries = null;
	document.scan(params, function(err, data) {
		if(err) console.log(err);
		else {
			console.log(data.Items);
			res.render('index', {"recipes":data.Items});	
		}
	});
	recipeCOunt = 0;
	//queryResults = await colleciton.find().skip(0).limit(3).toArray();
	//res.render('index');
};


/*
* displayMoreRecipes - function to query next 3 recipes and display more recipes in home page
*/
exports.displayMoreRecipes = async function(req, res) {
	//db.connect();
	//var collection = db.getdb().collection(collectionName);

	recipeCount += 1;
	//queryResults = await.collection.find().skip(recipeCount * 3).limit(3).toArray();
	res.render('index');
};

exports.displayAboutPage = async function(req, res) {
	res.render('about');
};
