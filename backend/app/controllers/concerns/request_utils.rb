module RequestUtils
  def createRequest(params)
    filterClause = [
        "terms": {
            "page_url": params[:urls]
        }
    ]

    must = {
        "range": {
            "derived_tstamp": {
                "gte": params[:after], 
                "lte": params[:before]
            }
        }
    }

    date_histogram = {
        "field": "derived_tstamp",
        "interval": params[:interval]
    }

    aggregation = {
            "events": {
                "date_histogram": date_histogram
            }
        }

    body = {
        "query": {
            "bool": {
                "filter": filterClause,
                "must": must
            }
        },
        "aggs": aggregation
    }
    body.to_json
  end

  def checkParamsValidity(params)
    return (params.has_key?('before') && 
        params.has_key?('after') &&
        params.has_key?('interval') &&
        params.has_key?('urls') &&
        (params[:before].instance_of? Bignum) &&
        (params[:after].instance_of? Bignum) && 
        (params[:interval].instance_of? String) &&
        (params[:urls].instance_of? Array))
  end

end