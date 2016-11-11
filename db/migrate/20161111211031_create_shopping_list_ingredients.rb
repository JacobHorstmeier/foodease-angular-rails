class CreateShoppingListIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :shopping_list_ingredients do |t|
      t.integer :shopping_list_id
      t.integer :ingredient_id

      t.timestamps
    end
  end
end
