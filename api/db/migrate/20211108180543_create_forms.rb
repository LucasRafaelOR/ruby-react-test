class CreateForms < ActiveRecord::Migration[6.1]
  def change
    create_table :forms do |t|
      t.string :name
      t.text :json_data
      t.boolean :is_child, :default => false

      t.timestamps
    end
  end
end
