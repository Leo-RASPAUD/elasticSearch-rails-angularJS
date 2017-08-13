export default class HomeController {
  constructor(HistogramService, $scope) {
    'ngInject';

    this.HistogramService = HistogramService;
    this.$scope = $scope;
    this.params = {
      urls: [],
      before: 1499973409634,
      after: 1496095200000,
      interval: '1d'
    };
    this.loading = false;
  }

  submit() {
    this.loading = true;
    this.histogramDisplayed = false;
    if (this.validateParams()) {
      this.HistogramService.getHistogram(this.params).then(this.displayResults.bind(this));
    } else {
      this.loading = false;
    }
  }

  validateParams() {
    if (!(this.params.before && this.params.after && this.params.interval && this.params.urls.length > 0)) {
      this.errorMessage = 'At least 1 parameter is missing';
      return false;
    }

    if (!this.params.urls.every((url) => url.match(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/))) {
      this.errorMessage = 'Invalid url pattern';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  displayResults(result) {
    if (result.error) {
      this.errorMessage = result.message;
    } else {
      this.errorMessage = '';
    }
    this.loading = false;
    this.histogramDisplayed = true;
    this.$scope.$apply();
    this.HistogramService.loadHistogramSvg(result.response.aggregations.events.buckets);
  }
}