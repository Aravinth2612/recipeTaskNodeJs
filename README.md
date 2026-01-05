##This is The API for creating a new recipe

curl --location 'http://localhost:8000/recipes' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Chicken Biryani",
  "ingredients": ["Rice", "Chicken", "Spices"],
  "instructions": "Cook rice, marinate chicken, mix and cook.",
  "prepTime": 45,
  "servings": 4
}'


##This is the API for fetching all the recipes

curl --location 'http://localhost:8000/recipes' \
--data ''

##This is the API to get a recipe by Id

curl --location 'http://localhost:8000/recipes/695b68efe52de82d8fac3c68'


##This is the API to edit a recipe

curl --location --request PUT 'http://localhost:8000/recipes/695b5181a3ad289d2a834aa8' \
--header 'Content-Type: application/json' \
--data '{
  "prepTime": 45
}
'

##This is the API to delete a recipe

curl --location --request DELETE 'http://localhost:8000/recipes/695b5181a3ad289d2a834aa8' \
--data ''
