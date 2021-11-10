class Value < ApplicationRecord
  belongs_to :key
  has_many :answers
end
