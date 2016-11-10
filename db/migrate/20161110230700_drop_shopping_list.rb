class DropShoppingList < ActiveRecord::Migration[5.0]
  def change
    drop_table :shopping_lists
  end
end
