class ShoppingListSerializer < ActiveModel::Serializer
  attributes :id, :ingredients
  def ingredients
    object.ingredients.map do |ingredient|
      IngredientSerializer.new(ingredient)
    end
  end
end
