# class RecipesController < ApplicationController
#   # before_action :authenticate_user
  
#   def show
#     binding.pry
#   end

#   def create
#     cookbook = Cookbook.find(params[:cookbook_id])
#     # for params[:recipe] do |recipe|
#     # end
#     binding.pry
#     recipe = Recipe.find_or_create_by(
#       label: params[:recipe][:label], 
#       image: params[:recipe][:image], 
#       url: params[:recipe][:url], 
#       ingredient_lines: params[:recipe][:ingredientLines].join("\n")
#       )

#     params[:recipe][:ingredients].map do |ingredient|
#       recipe.ingredients << Ingredient.find_or_create_by(name: ingredient[:food])
#     end
#     recipe.ingredients.uniq{|ing| ing.name}
#     recipe.save
#     cookbook.recipes << recipe
#     cookbook.save
#     render json: cookbook
#   end

#   def destroy
#     cookbook = Cookbook.find(params[:cookbook_id])
#     binding.pry
#     params[:label] ? recipe = Recipe.find_by(label: params[:id]) : recipe = Recipe.find(params[:id])

#     cookbook.recipes.delete(recipe)
#     render json: cookbook
#   end

# end

