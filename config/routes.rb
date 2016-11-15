Rails.application.routes.draw do
  devise_for :users
  root 'application#index'  
  resources :users, only: [:show, :update]
  resources :recipes, only: [:create, :destroy]
end
