import { Element, Component, Host, h } from '@stencil/core';
import * as d3 from 'd3';
import * as stdlib from '@observablehq/stdlib';
import { format } from 'date-fns';

import { data } from './mock';

@Component({
  tag: 'app-timeline-chart',
  styleUrl: 'app-timeline-chart.css',
  shadow: true,
})
export class AppTimelineChart {
  @Element() element: HTMLElement;

  height = 600;
  width = 1200;
  margin = { top: 0, right: 20, bottom: 50, left: 40 };

  componentDidLoad() {
    let svg = d3
      .select(this.element.shadowRoot.querySelectorAll('.chart')[0])
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    this.buildChart(svg);
  }

  buildChart(svg) {
    const { DOM } = new stdlib.Library();

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([this.margin.left, this.width - this.margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = (g, x) =>
      g
        .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        .attr('class', 'x-axis')
        .style("font-size","18px")
        .call(
          d3
            .axisBottom(x)
            .ticks(this.width / 80)
            .tickSize(60,0)
            .tickFormat((d) => format(d, 'MMM yy'))
            .tickSizeOuter(0),
        );

    const area = (data, x) =>
      d3
        .area()
        .curve(d3.curveStepAfter)
        .x(d => x(d.date))
        .y0(y(0))
        .y1(d => y(d.value))(data);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .extent([
        [this.margin.left, 0],
        [this.width - this.margin.right, this.height],
      ])
      .translateExtent([
        [this.margin.left, -Infinity],
        [this.width - this.margin.right, Infinity],
      ])
      .on('zoom', zoomed);

    const clip = DOM.uid('clip');
    // const path = svg.append('path').attr('clip-path', clip).attr('fill', 'steelblue').attr('d', area(data, x));

    svg
      .append('clipPath')
      .attr('id', clip.id)
      .append('rect')
      .attr('x', this.margin.left)
      .attr('y', this.margin.top)
      .attr('width', this.width - this.margin.left - this.margin.right)
      .attr('height', this.height - this.margin.top - this.margin.bottom);

    const gx = svg.append('g').call(xAxis, x);

    svg
      .call(zoom)
      .transition()
      .duration(750)
      .call(zoom.scaleTo, 3, [x(Date.UTC(2019, 1, 1)), 0]);

    function zoomed(event) {
      const xz = event.transform.rescaleX(x);
      // path.attr('d', area(data, xz));
      gx.call(xAxis, xz);
    }
  }

  render() {
    return (
      <Host>
        <p>Time line chart</p>
        <div class="timeline-svg-container">
          <svg class="chart" />
        </div>
      </Host>
    );
  }
}
