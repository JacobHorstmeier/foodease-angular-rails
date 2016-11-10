class ShoppingList < ApplicationRecord
  belongs_to :user
  has_many :ingredients, through: :user
end
