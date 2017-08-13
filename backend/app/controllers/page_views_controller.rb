require 'elasticsearch'
require 'date'

class PageViewsController < ApplicationController

    # POST /page_views
    def create
        if checkParamsValidity(params) == false
            puts "Error while checking the params validity"
            return render :json => @error_object.to_json, :status => :unprocessable_entity
        else 
            requestBody = createRequest(params)
            now = Time.now.to_i
            puts "\n-------Request"
            puts requestBody
            puts "-------End Request\n\n"
            result = get_es_client().search index: 'events', body: requestBody
            return json_response(result)
        end 
    end

end

