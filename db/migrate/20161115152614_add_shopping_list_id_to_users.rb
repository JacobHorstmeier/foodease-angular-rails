class AddShoppingListIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :shopping_list_id, :integer
  end
end
