class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :label, :image, :url
  has_many :ingredients
end
