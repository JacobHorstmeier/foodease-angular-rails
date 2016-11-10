class Menu < ApplicationRecord
  has_many :recipe_menus
  has_many :receipes, through: :recipe_menus
end
