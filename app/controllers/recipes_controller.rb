class RecipesController < ApplicationController
  # before_action :authenticate_user
  
  def show
    binding.pry
  end

  def create
    binding.pry
    cookbook = Cookbook.find(params[:cookbook_id])
    recipe = Recipe.find_or_create_by(label: params[:recipe][:label])
    recipe.image = params[:recipe][:image]
    recipe.url = params[:recipe][:url]
    recipe.ingredient_lines = params[:recipe][:ingredientLines].join("\n")
    params[:recipe][:ingredients].map do |ingredient|
      recipe.ingredients << Ingredient.find_or_create_by(name: ingredient.food)
    end
    recipe.ingredients.uniq
  end

  def destroy
    binding.pry
  end

end