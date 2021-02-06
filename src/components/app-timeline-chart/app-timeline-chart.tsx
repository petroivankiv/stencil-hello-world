import { Element, Component, Host, h } from '@stencil/core';
import * as d3 from 'd3';
import { format } from 'date-fns';

import { data, scatterPlot } from './mock';

@Component({
  tag: 'app-timeline-chart',
  styleUrl: 'app-timeline-chart.css',
  shadow: true,
})
export class AppTimelineChart {
  @Element() element: HTMLElement;

  height = 150;
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
    const brush = d3
      .brushX()
      .extent([
        [this.margin.left, this.margin.top],
        [this.width - this.margin.right, this.height - this.margin.bottom],
      ])
      .on('end', brushended);
    const interval = d3.timeDay.every(10);

    // rundom y value for scatter plot
    const y = d3.randomUniform(this.height / 2, this.height / 8);

    const vLines = g =>
      g
        .append('g')
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeMonth)
            .tickSize(-this.height + this.margin.top + this.margin.bottom)
            .tickFormat(() => null),
        )
        .call(g => g.select('.domain').attr('fill', '#fff').attr('stroke', null))
        .call(g => g.selectAll('.tick line').attr('stroke', '#dadada'));

    const brushTicks = g =>
      g
        .append('g')
        .call(
          d3
            .axisBottom(x)
            .ticks(interval)
            .tickSize(-this.height + this.margin.top + this.margin.bottom)
            .tickFormat(() => null),
        )
        .call(g => g.select('.domain').attr('fill', '#fff').attr('stroke', null))
        .call(g =>
          g
            .selectAll('.tick line')
            .attr('stroke', '#fff')
            .attr('stroke-opacity', d => (d <= d3.timeDay(d) ? 1 : 0.5)),
        );

    const xAxisLabels = g =>
      g
        .append('g')
        .style('font-size', '16px')
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeMonth)
            .tickSize(0, 0)
            .tickPadding(10)
            .tickFormat(d => format(d, 'MMM yy')),
        )
        // .attr('text-anchor', null)
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('text').attr('x', 6));

    const xAxis = g =>
      g
        .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        .call(brushTicks)
        .call(vLines)
        .call(xAxisLabels);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .rangeRound([this.margin.left, this.width - this.margin.right]);

    svg.append('g').call(xAxis);
    svg.append('g').attr('class', 'brush').call(brush);
    svg
      .append('g')
      .selectAll('dot')
      .data(scatterPlot)
      .enter()
      .append('circle')
      .attr('cx', d => x(new Date(d.date)))
      .attr('cy', () => y())
      .attr('r', 2.5)
      .style('fill', 'rgb(25, 42, 201)');

    function brushended(event) {
      const selection = event.selection;

      if (!event.sourceEvent || !selection) return;

      const [x0, x1] = selection.map(d => interval.round(x.invert(d)));

      d3.select(this)
        .transition()
        .call(brush.move, x1 > x0 ? [x0, x1].map(x) : null);
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
