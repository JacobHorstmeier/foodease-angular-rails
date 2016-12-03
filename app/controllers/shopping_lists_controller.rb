class ShoppingListsController < ApplicationController


  def update
    # binding.pry
    shopping_list = ShoppingList.find(params[:shopping_list_id])
    unless ingredient = Ingredient.find_by(id: params[:id])
      ingredient = Ingredient.find_or_create_by(food: params[:ingredient_name])
    end

    if params[:checked] != nil
      shopping_list_ingredient = ShoppingListIngredient.find_by(shopping_list_id: shopping_list.id, ingredient_id: ingredient.id)
      shopping_list_ingredient.checked = params[:checked]
      shopping_list_ingredient.save
      render json: [shopping_list.user, shopping_list_ingredient]
    else
      if params[:method] == "DELETE"
        shopping_list.ingredients.delete(ingredient) 
      else
        shopping_list.ingredients << ingredient
      end
      shopping_list.save
      render json: shopping_list.user
    end
  end

  def destroy
    shopping_list = ShoppingList.find(params[:shopping_list_id])
    unless ingredient = Ingredient.find_by(id: params[:id])
      ingredient = Ingredient.find_or_create_by(food: params[:ingredient_name])
    end
    shopping_list.ingredients.delete(ingredient)
    shopping_list.save
    render json: shopping_list.user
  end

end

