class UsersController < ApplicationController
  def show
    user = User.find(params[:userId])
    binding.pry
  end

  def update

  end
end
