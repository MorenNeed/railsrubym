Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: '/auth/login',
    sign_out: '/auth/signout',
    registration: '/auth/register',
  },
  controllers: {
    sessions: 'auth/sessions',
    registrations: 'auth/registrations',
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  resources :users do
    patch 'update_password', on: :member
  end
  resources :items do
    collection do
      get 'manage'
    end
  end
  resources :orders
end
