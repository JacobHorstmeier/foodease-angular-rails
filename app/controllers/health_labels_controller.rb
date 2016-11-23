class HealthLabelsController < ApplicationController

  def index
    render json: HealthLabel.all
  end

  def update
    user = User.find(params[:user_id])
    health_label = HealthLabel.find(params[:id])
    user.health_labels << health_label
    labels = HealthLabel.all

    render json: user
  end

  def destroy
    user = User.find(params[:user_id])
    health_label = HealthLabel.find(params[:id])
    user.health_labels.delete(health_label)
    
    render json: user
  end
end
