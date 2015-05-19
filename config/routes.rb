Rails.application.routes.draw do
  root 'welcome#index'
  resources :patients
  # get "/patients/:id/donut" => "patients#donut", :as => :donut
  resources :sessions, only: [:create, :destroy, :new]
  get "/signout" => "sessions#destroy", :as => :signout
end
