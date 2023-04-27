class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  # New attributes
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :role, presence: true

  has_one :cart, class_name: "cart", foreign_key: "cart_id"
end
