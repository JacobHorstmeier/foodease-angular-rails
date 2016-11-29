class ShoppingListIngredients < ApplicationController
  def show
    ingredient = ShoppingListIngredient.find(params[:id])
    render json: user
  end

  def update

  end
end
