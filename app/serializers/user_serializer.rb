class UserSerializer < ActiveModel::Serializer
  attributes :id, :healthLabels, :username
  has_one :cookbook
  has_one :shoppingList

  def healthLabels
    object.health_labels.map do |health_label|
      HealthLabelSerializer.new(health_label)
    end
  end

  def shoppingList
    ShoppingListSerializer.new(object.shopping_list)
  end
end
