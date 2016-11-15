class RecipesController < ApplicationController
  # before_action :authenticate_user
  
  def show
    binding.pry
  end

  def create
    cookbook = Cookbook.find(params[:cookbook_id])
    # for params[:recipe] do |recipe|
    # end
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
    cookbook.save
    # binding.pry
    render json: recipe
  end

  def destroy
    binding.pry
  end

end

