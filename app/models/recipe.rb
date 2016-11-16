class Recipe < ApplicationRecord
  has_many :recipe_cookbooks
  has_many :cookbooks, through: :recipe_cookbooks
  has_many :ingredients
  has_many :recipe_health_labels
  has_many :health_labels, through: :recipe_health_labels
  accepts_nested_attributes_for :ingredients

  # def ingredientLines=(ingredients_array)
  #   binding.pry
  #   # turn into to separate strings
  # end

  # def ingredient_lines=(ingredients_string)
  #   binding.pry
  #   #split string
  # end

  def ingredients_attributes=(ingredients_hash)
    binding.pry
    # find or create new ingredients
  end
end
