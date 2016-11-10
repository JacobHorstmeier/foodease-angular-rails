class CreateRecipeMenus < ActiveRecord::Migration[5.0]
  def change
    create_table :recipe_menus do |t|
      t.integer :menu_id
      t.integer :recipe_id

      t.timestamps
    end
  end
end
