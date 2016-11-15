class RenameMenuToCookbook < ActiveRecord::Migration[5.0]
  def change
    rename_table :menus, :cookbooks
  end
end
