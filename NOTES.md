<!-- USER -->
has email address, username, password
has many healthLabels
has a menu
has a shoppingList
has many ingredients through shoppingList

<!-- MENU -->
belong to user
has many recipes

<!-- HEALTHLABEL -->
belongs to recipe
belogns to user

<!-- SHOPPING LIST -->
belongs to user
has many ingredients

<!-- INGREDIENTS -->
belong to shoppingList
belong to recipe

<!-- RECIPE -->
belongs to menu
has an imageUrl
has many healthLabels
has many ingredients
has many ingredientLines 








Recipe Shopping List

Search for recipes, add recipes to the menu,  add ingredients to the shopping list

- Search for recipes ('/')
- Filter by healthLabels
  - View recipe page ('/recipe/:id')
    - Display: image, ingredientLines, url, healthLabels
    - Button: Add to menu
      - Adds ingredients to Shopping List

- View Current Menu ('/menu')
  - List recipes
  - Button: Remove recipes

- Shopping List ('/shopping')
  - View all ingredients from all reciepes on Menu
  - Button: Strikethrough indgredient