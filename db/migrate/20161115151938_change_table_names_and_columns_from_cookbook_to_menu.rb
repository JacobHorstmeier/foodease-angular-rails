class ChangeTableNamesAndColumnsFromCookbookToMenu < ActiveRecord::Migration[5.0]
  def change
    rename_table :recipe_menus, :recipe_cookbooks
    rename_column :recipe_cookbooks, :menu_id, :cookbook_id
    rename_column :users, :menu_id, :cookbook_id
  end
end
