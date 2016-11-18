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
          ingredient = Ingredient.find_or_create_by(text: ingredient[:text], food: ingredient[:food])
          recipe.ingredients << ingredient unless recipe.ingredients.include?(ingredient)
        end
      end
      recipe.save
      cookbook.recipes << recipe unless cookbook.recipes.include?(recipe)
    end
      cookbook.save
      user = cookbook.user
      # binding.pry
    render json: user
  end

private

  def recipe_params
    params.require(:recipe).permit(:label, :image, :url)
  end
  
end