class UserSerializer < ActiveModel::Serializer
  attributes :id, :healthLabels, :username
  has_one :cookbook
  has_one :shopping_list

  def healthLabels
    object.health_labels.map do |health_label|
      HealthLabelSerializer.new(health_label)
    end
  end
end
