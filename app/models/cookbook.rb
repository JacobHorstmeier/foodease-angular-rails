class Cookbook < ApplicationRecord
  belongs_to :user
  has_many :recipe_cookbooks
  has_many :recipes, through: :recipe_cookbooks
  has_many :ingredients, through: :recipes
end
