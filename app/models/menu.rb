class Menu < ApplicationRecord
  belongs_to :user
  has_many :recipe_menus
  has_many :recipes, through: :recipe_menus
  has_many :ingredients, through: :recipes
end
