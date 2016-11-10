class HealthLabel < ApplicationRecord
  has_many :user_health_lables
  has_many :users, through: :user_health_lables
  has_many :recipe_health_lables
  has_many :recipes, through: :recipe_health_lables
end
