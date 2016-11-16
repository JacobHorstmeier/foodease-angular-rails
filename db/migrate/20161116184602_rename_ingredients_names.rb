class RenameIngredientsNames < ActiveRecord::Migration[5.0]
  def change
    rename_column :ingredients, :name, :text
    add_column :ingredients, :food, :string
  end
end
