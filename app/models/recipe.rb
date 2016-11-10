class Recipe < ApplicationRecord
  has_many :recipe_menus
  has_many :menus, through: :recipe_menus
end
