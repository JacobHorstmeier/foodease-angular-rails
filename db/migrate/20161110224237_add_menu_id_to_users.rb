class AddMenuIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :menu_id, :integer
  end
end
