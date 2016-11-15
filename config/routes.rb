Rails.application.routes.draw do
  devise_for :users
  root 'application#index'  
  # resources :users, only: [:show, :update]
  # resources :cookbooks, only: [] do
  #   resources :recipes, only: [:create, :destroy, :index]
  # end

  put "/cookbooks/:cookbook_id/recipes/:id" => "cookbooks#update"
  put "/cookbooks/:cookbook_id/recipes" => "cookbooks#update"
end
