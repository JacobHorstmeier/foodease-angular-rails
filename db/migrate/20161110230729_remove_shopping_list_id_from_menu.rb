class RemoveShoppingListIdFromMenu < ActiveRecord::Migration[5.0]
  def change
    remove_column :menus, :shopping_list_id
  end
end
