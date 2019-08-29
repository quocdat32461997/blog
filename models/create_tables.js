const aws = require('aws-sdk');
const path = require('path');
const table_name = 'recipes';
//const dynamodb = require('dynamodb');
const config = require('../dynamodb/dynamodb_config.js');

//configure aws dynamodb
aws.config.update(config.aws_remote_config);

const dynamodb = new aws.DynamoDB();

//define table params
var  params = {
	TableName: 'recipes',
	KeySchema: [
		{AttributeName: 'recipeID', KeyType: 'HASH'},
		{AttributeName: 'recipeName', KeyType: 'RANGE'}
	],
	AttributeDefinitions: [
		{AttributeName: 'recipeID', AttributeType: 'S'},
		{AttributeName: 'recipeName', AttributeType: 'S'}
	]
};

//create recipe table
dynamodb.createTable(params, function(err, data) {
	if(err) {
		console.log("Error", err);
	}
	else {
		console.log("Table created", err);
	}
}); 
