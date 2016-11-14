Rails.application.routes.draw do
  devise_for :users
  root 'application#index'  
  resources :recipes, only: [:create, :destroy]
end
