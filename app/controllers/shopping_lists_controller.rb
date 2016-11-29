class ShoppingListsController < ApplicationController


  def update
    shopping_list = ShoppingList.find(params[:shopping_list_id])
    ingredient = Ingredient.find(params[:id])
    if params[:checked] != nil
      shopping_list_ingredient = ShoppingListIngredient.find_by(shopping_list_id: shopping_list.id, ingredient_id: ingredient.id)
      shopping_list_ingredient.checked = params[:checked]
      shopping_list_ingredient.save
      render json: [shopping_list.user, shopping_list_ingredient]
    else
      shopping_list.ingredients << ingredient
      shopping_list.save
      render json: shopping_list.user
    end
  end

  def destroy
    shopping_list = ShoppingList.find(params[:shopping_list_id])
    ingredient = Ingredient.find(params[:id])
    shopping_list.ingredients.delete(ingredient)
    shopping_list.save
    render json: shopping_list.user
  end

end

