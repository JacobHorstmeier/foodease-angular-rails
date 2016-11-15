class CookbookSerializer < ActiveModel::Serializer
  attributes :id, :recipes
  
  def recipes
    object.recipes.map do |recipe|
      RecipeSerializer.new(recipe)
    end
  end
end
