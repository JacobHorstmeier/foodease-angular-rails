class AddIngredientLinesToRecipes < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :ingredient_lines, :string
  end
end
