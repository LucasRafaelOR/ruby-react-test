class CreateAnswerResponses < ActiveRecord::Migration[6.1]
  def change
    create_join_table :answers, :responses do |t|
        t.index [:response_id, :answer_id]
        t.index [:answer_id, :response_id]
    end
  end
end
