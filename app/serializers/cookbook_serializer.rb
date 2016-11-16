class CookbookSerializer < ActiveModel::Serializer
  attributes :id, :recipes, :ingredients
  
  def recipes
    object.recipes.map do |recipe|
      RecipeSerializer.new(recipe)
    end
  end

  def ingredients
    object.ingredients.each do |ingredient|
      IngredientSerializer.new(ingredient)
    end
  end
end
