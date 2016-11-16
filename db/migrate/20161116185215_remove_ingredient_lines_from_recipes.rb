class RemoveIngredientLinesFromRecipes < ActiveRecord::Migration[5.0]
  def change
    remove_column :recipes, :ingredientLines
  end
end
