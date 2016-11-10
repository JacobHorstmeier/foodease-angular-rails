class Recipe < ApplicationRecord
  has_many :recipe_menus
  has_many :menus, through: :recipe_menus
  has_many :ingredients
  has_many :recipe_health_labels
  has_many :health_labels, through: :recipe_health_labels
end
