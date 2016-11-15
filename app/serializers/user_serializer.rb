class UserSerializer < ActiveModel::Serializer
  attributes :id
  has_one :cookbook
  has_one :shopping_list
end
