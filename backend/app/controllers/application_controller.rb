class ApplicationController < ActionController::API
  include Response
  include EsClient
  include RequestUtils
end