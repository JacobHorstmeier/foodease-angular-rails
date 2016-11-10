class RecipeHealthLabel < ApplicationRecord
  belongs_to :recipe
  belongs_to :health_label
end
