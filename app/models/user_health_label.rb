class UserHealthLabel < ApplicationRecord
  belongs_to :user
  belongs_to :health_label
end
