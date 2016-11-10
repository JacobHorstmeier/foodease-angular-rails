class ShoppingList < ApplicationRecord
  belongs_to :menu
  has_many :ingredients, through: :menu
end
