class CreateKeys < ActiveRecord::Migration[6.1]
  def change
    create_table :keys do |t|
      t.string :data_type
      t.string :default_val
      t.boolean :mutable
      t.references :form, null: false, foreign_key: true

      t.timestamps
    end
  end
end
