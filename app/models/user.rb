class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  has_one :cookbook
  has_one :shopping_list
  has_many :ingredients, through: :shopping_list 
  has_many :user_health_labels
  has_many :health_labels, through: :user_health_labels

  after_create :create_shopping_list_and_cookbook

  def create_shopping_list_and_cookbook
    self.cookbook = Cookbook.create
    self.shopping_list = ShoppingList.create
  end


end
