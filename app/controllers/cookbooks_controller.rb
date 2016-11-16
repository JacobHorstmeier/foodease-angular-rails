class CookbooksController < ApplicationController

  def update
    cookbook = Cookbook.find(params[:cookbook_id])
    if params[:remove]
      recipe = Recipe.find_by(label: params[:label])
      cookbook.recipes.delete(recipe)
    else
      # binding.pry
      params[:recipe][:ingredientLines].join('\n')

      recipe = Recipe.find_or_create_by(recipe_params)

      if params[:recipe][:ingredients]
        params[:recipe][:ingredients].map do |ingredient|
          recipe.ingredients << Ingredient.find_or_create_by(name: ingredient[:food])
        end
      end
      recipe.ingredients.uniq{|ing| ing.name}

      recipe.save
      cookbook.recipes << recipe
    end
      cookbook.save
    render json: cookbook
  end

private

  def recipe_params
    params.require(:recipe).permit(:label, :image, :url, :ingredientLines)
  end
  
end
