class CreateMenus < ActiveRecord::Migration[5.0]
  def change
    create_table :menus do |t|
      t.integer :user_id
      t.integer :shopping_list_id
      t.timestamps
    end
  end
end
