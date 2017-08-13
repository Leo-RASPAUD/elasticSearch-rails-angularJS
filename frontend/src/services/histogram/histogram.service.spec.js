import HistogramService from './histogram.service';

describe('main.service.histogram', () => {
  let histogramService;

  beforeEach(inject(function() {
    histogramService = new HistogramService();
  }));

  afterEach(function() {
    histogramService = null;
  });

  it('should test the service exists', () => {
    expect(HistogramService).to.not.be.undefined;
    expect(histogramService).to.not.be.undefined;
    expect(histogramService.getHistogram).to.not.be.undefined;
    expect(histogramService.loadHistogramSvg).to.not.be.undefined;
  });

});