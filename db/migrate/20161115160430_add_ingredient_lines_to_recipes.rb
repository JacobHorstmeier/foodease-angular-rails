class AddIngredientLinesToRecipes < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :ingredientLines, :string
  end
end
