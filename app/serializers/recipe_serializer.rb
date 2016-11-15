class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :label, :image, :url, :ingredient_lines
  has_many :ingredients
end
