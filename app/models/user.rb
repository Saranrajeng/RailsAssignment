class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  has_one :employee
  enum role: { admin: 0, employee: 1}
  def to_json
    {id: id, email: email, role: role, name: name}
  end
end