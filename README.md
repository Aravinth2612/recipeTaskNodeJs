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
