Rails.application.routes.draw do
  get '/responses', to: 'responses#index'
  get '/forms/:id/responses', to: 'responses#get_by_form_id'
  get '/responses/:id', to: 'responses#show'
  post '/responses', to: 'responses#create'

  resources :forms
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
