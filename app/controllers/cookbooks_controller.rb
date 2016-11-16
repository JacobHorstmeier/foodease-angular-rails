class CookbooksController < ApplicationController

  def update
    cookbook = Cookbook.find(params[:cookbook_id])
    if params[:remove]
      recipe = Recipe.find_by(label: params[:label])
      cookbook.recipes.delete(recipe)
    
    else
      recipe = Recipe.find_or_create_by(recipe_params)
      if params[:recipe][:ingredients]
        params[:recipe][:ingredients].map do |ingredient|
          ingredient = Ingredient.find_or_create_by(name: ingredient[:food])
          recipe.ingredients << ingredient unless recipe.ingredients.include?(ingredient)
        end
      end
      recipe.save
      cookbook.recipes << recipe unless cookbook.recipes.include?(recipe)
    end
      cookbook.save
    render json: cookbook
  end

private

  def recipe_params
    params.require(:recipe).permit(:label, :image, :url, :ingredientLines)
  end
  
end
