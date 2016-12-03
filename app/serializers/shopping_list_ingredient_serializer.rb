class ShoppingListIngredientSerializer < ActiveModel::Serializer
  attributes :id, :shopping_list_id, :ingredient_id, :checked
end
