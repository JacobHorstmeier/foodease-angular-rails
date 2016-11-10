class CreateRecipeHealthLabels < ActiveRecord::Migration[5.0]
  def change
    create_table :recipe_health_labels do |t|
      t.integer :recipe_id
      t.integer :health_label_id

      t.timestamps
    end
  end
end
