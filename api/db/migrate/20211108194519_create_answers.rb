class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.string :curr_key
      t.string :curr_value
      t.references :value, null: false, foreign_key: true

      t.timestamps
    end
  end
end
