class CreateUserHealthLabels < ActiveRecord::Migration[5.0]
  def change
    create_table :user_health_labels do |t|
      t.integer :user_id
      t.integer :health_label_id

      t.timestamps
    end
  end
end
