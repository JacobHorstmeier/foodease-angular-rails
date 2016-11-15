class CookbooksController < ApplicationController

  def update
    cookbook = Cookbook.find(params[:cookbook_id])
    if params[:remove]
      recipe = Recipe.find_by(label: params[:label])
      cookbook.recipes.delete(recipe)
    else
      recipe = Recipe.find_or_create_by(
      label: params[:recipe][:label], 
      image: params[:recipe][:image], 
      url: params[:recipe][:url], 
      ingredient_lines: params[:recipe][:ingredientLines].join("\n")
      )
      params[:recipe][:ingredients].map do |ingredient|
        recipe.ingredients << Ingredient.find_or_create_by(name: ingredient[:food])
      end
      recipe.ingredients.uniq{|ing| ing.name}
      recipe.save
      cookbook.recipes << recipe
    end
      cookbook.save
    render json: cookbook
  end
end