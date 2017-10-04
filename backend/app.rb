require 'sinatra'
require 'sinatra/cross_origin'
require 'httparty'

set :bind, '0.0.0.0'

configure do
  enable :cross_origin
end  

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options '*' do
  response.headers["Allow"] = "GET, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end

get '/api/bracket/:name' do
  response = HTTParty.get("https://api.challonge.com/v1/tournaments/#{params['name']}.json?api_key=#{ENV['CHALLONGE_API_KEY']}&include_matches=1&include_participants=1")

  content_type :json
  status response.code
  response.body
end
