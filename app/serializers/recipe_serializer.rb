class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :ingredient_lines
  has_many :ingredients
end
