class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :label, :image, :url, :ingredientLines
  has_many :ingredients
end
