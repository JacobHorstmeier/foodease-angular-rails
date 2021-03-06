Rails.application.routes.draw do
  devise_for :users
  root 'application#index'  
  put "/cookbooks/:cookbook_id/recipes" => "cookbooks#update"
  put "/shopping_list/:shopping_list_id/ingredients/:id" => "shopping_lists#update"
  put "/shopping_list/:shopping_list_id" => "shopping_lists#update"
  delete "/shopping_list/:shopping_list_id/ingredients/:id" => "shopping_lists#destroy"
  delete "/shopping_list/:shopping_list_id" => "shopping_lists#destroy"
  resources :health_labels, only: [:index]
  put "/users/:user_id/health_labels/:id" => "health_labels#update"
  delete "/users/:user_id/health_labels/:id" => "health_labels#destroy"
end
