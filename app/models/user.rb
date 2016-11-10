class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  has_one :menu
  has_one :shopping_list, through: :menu
  has_many :user_health_labels
  has_many :health_labels, through: :user_health_labels


end
