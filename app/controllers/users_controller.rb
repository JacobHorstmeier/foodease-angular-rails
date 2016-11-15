class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
    # binding.pry
  end

  def update

  end
end
