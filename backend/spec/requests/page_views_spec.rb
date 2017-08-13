require 'rails_helper'

RSpec.describe 'Page view API', type: :request do
    
    describe 'POST /page_views' do
        it 'Should return 422 if the parameters are incorrect' do
            post '/page_views', params: {before:"", after:2, interval:"1d"}
            expect(response).to have_http_status(422)
        end
    end
end