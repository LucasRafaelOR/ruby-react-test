class CreateValues < ActiveRecord::Migration[6.1]
  def change
    create_table :values do |t|
      t.string :data_type
      t.string :default_val
      t.boolean :mutable
      t.references :key, null: false, foreign_key: true
      t.references :form, null: true, foreign_key: true

      t.timestamps
    end
  end
end
