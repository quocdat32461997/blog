const collectionName = 'recipes';
var recipeCount = 0;

/*
* displayRecipesInHomePage - function to query recipes and display recipes in home page
*/
exports.displayRecipesInHomePage = async function(req, res) {
	//db.connect();
	//var collection = db.getdb().collection(collectionName);

	recipeCOunt = 0;
	//queryResults = await colleciton.find().skip(0).limit(3).toArray();
	res.render('index');
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
