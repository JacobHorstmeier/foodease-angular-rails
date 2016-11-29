class AddCheckedToShoppingListIngredients < ActiveRecord::Migration[5.0]
  def change
    add_column :shopping_list_ingredients, :checked, :boolean
  end
end
