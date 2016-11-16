Rails.application.routes.draw do
  devise_for :users
  root 'application#index'  
  # resources :users, only: [:show, :update]
  # resources :cookbooks, only: [] do
  #   resources :recipes, only: [:create, :destroy, :index]
  # end

  # put "/cookbooks/:cookbook_id/recipes/:id" => "cookbooks#update"
  put "/cookbooks/:cookbook_id/recipes" => "cookbooks#update"
  put "/shopping-lists/:shopping_list_id/ingredients/:id" => "shopping_lists#update"
  delete "/shopping-lists/:shopping_list_id/ingredients/:id" => "shopping_lists#destroy"
end
