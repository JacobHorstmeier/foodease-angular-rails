class ShoppingListsController < ApplicationController


  def update
    shopping_list = ShoppingList.find(params[:shopping_list_id])
    ingredient = Ingredient.find(params[:id])
    shopping_list.ingredients << ingredient
    shopping_list.save
    render json: shopping_list    
  end

  def destroy
    shopping_list = ShoppingList.find(params[:shopping_list_id])
    ingredient = Ingredient.find(params[:id])
    shopping_list.ingredients.delete(ingredient)
    shopping_list.save
    render json: shopping_list
  end

end

