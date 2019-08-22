/* createRecipes - function to create recipe document that recipe is designed as following: *       recipeID - alphanumeric
*	recipeName - stringe                                                                *       ingredients - list of objects that each is an ingredient                            *		ingredient - object consistig of multiple attribtues
*		-> Name
*		-> Amout
*	steps - list of strings that describe cookign instrucitons. In future, steps become list of paragraphs (string).                                                                */           
module.exprots = {
	"titile":"Recipe",
	"type": "object",
	"properties": {
		"recipeID": {
			"description": "unique id of a recipe",
			"type":"string"
		},
		"recipeName": {
			"description": "name of the recipe",
			"type":"string"
		},
		"ingredients": {
			"description": "list of ignredients",
			"type": "object",
			"properties": {
				"ingredient_name": {
					"description":"name of the ingredient",
					"type":"string"
				},
				"ingredient_amount": {
					"description":"amount of the ingredient",
					"type":"number"
				}
			}
		},
		"steps": {
			"description":"list of cooking instructions",
			"type": "array",
			"items": {
				"type":"string"
			}
		}
	}	
}
