class HealthLabelsController < ApplicationController

  def index
    render json: HealthLabel.all
  end

  def update

  end

  def destroy

  end
end
