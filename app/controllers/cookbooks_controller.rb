class CookbooksController < ApplicationController

  def update
    # binding.pry
    cookbook = Cookbook.find(params[:cookbook_id])
    if params[:remove]
      recipe = Recipe.find_by(label: params[:label])
      cookbook.recipes.delete(recipe)
    else
      recipe = Recipe.find_or_create_by(recipe_params)

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

private

def recipe_params
  params.require(:recipe).permit(:label, :image, :url, :ingredientLines, :ingredient_lines)
end

# {"id"=>9, "label"=>"French in a Flash: Moroccan Spiced Seared Rare Tuna", "image"=>"https://www.edamam.com/web-img/d15/d1543a1c9f149387a3cc4aab4e66f945.jpg", "url"=>"http://www.seriouseats.com/recipes/2011/10/moroccan-spiced-seared-rare-tuna-recipe.html", "ingredient_lines"=>"4 4-ounces pieces of fresh tuna\n2 teaspoons ras-el-hanout\nKosher salt\n2 tablespoons canola oil\nHarissa, for serving\nLemon wedges, for serving", "ingredients"=>[{"id"=>38, "name"=>"ra el hanout"}, {"id"=>27, "name"=>"kosher salt"}, {"id"=>39, "name"=>"canola oil"}, {"id"=>37, "name"=>"tuna"}], "bookmarked"=>true}