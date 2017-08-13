import * as d3 from 'd3';

export default class HistogramService {
  constructor($log) {
    'ngInject';
    this.$log = $log;
  }

  getHistogram(params) {
    this.$log.debug(`${Date.now()} : histogram.service.getHistogram, \n${JSON.stringify(params)}`);
    return fetch('http://localhost:3000/page_views', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(response => {
      if (response.status === 422) {
        return { error: true, message: 'Some parameters are missing' };
      } else if (response.status === 500) {
        return { error: true, message: response.statusText };
      } else {
        return response.json();
      }
    }).then(data => {
      return { error: false, response: data };
    }).catch(error => ({ error: true, message: error.toString() }));
  }

  loadHistogramSvg(results) {

    const reformatvalues = (elem) => {
      elem.date = new Date(elem.key);
      elem.value = elem.doc_count;
      return elem;
    };
    const data = results.map(reformatvalues);

    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const startDate = new Date('2017-06-01T01:00:00.000Z');
    const endDate = new Date('2017-06-01T23:00:00.000Z');

    // X function()
    const x = d3.scaleUtc()
      .domain([startDate, endDate])
      .rangeRound([0, width]);

    // Y function()
    const y = d3.scaleLinear().range([height, 0]);

    const histogram = d3.histogram()
      .value(d => d.date)
      .domain(x.domain())
      .thresholds(x.ticks(d3.timeHour));

    const bins = histogram(data);

    const svg = d3.select('#histo').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    y.domain([0, d3.max(bins, d => d.length > 0 ? d[0].value : 0)]);

    svg.selectAll('rect')
      .data(bins)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 1)
      .attr('transform', d => d.length > 0 ? 'translate(' + x(d.x0) + ',' + y(d[0].value) + ')' : 'translate(0,0)')
      .attr('width', d => x(d.x1) - x(d.x0) - 1)
      .attr('height', d => d.length > 0 ? height - y(d[0].value) : height - 0);

    // add the x Axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }

}