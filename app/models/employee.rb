class Employee < ApplicationRecord
  belongs_to :department
  has_many :bills, foreign_key: 'submitted_by_id'
  belongs_to :user
end
