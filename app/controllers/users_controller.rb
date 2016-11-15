class UsersController < ApplicationController
  def show
    user = User.last
    # binding.pry
    render json: user
  end

  def update

  end
end
