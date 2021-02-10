import { Component, Host, h, State } from '@stencil/core';
import { data, events } from './mock';

@Component({
  tag: 'app-timeline-events',
  styleUrl: 'app-timeline-events.css',
  shadow: true,
})
export class AppTimelineEvents {
  @State() range: Date[];

  events = events;
  chartData = data;
  scatterPlot = events.reduce((acc, curr) => {
    return [...acc, ...curr.events];
  }, []);

  onSelectRange(range: CustomEvent<Date[]>) {
    this.range = range.detail;
  }

  render() {
    return (
      <Host>
        <app-events events={events} range={this.range} />
        <div class="devider" />
        <app-timeline scatterPlot={this.scatterPlot} data={this.chartData} onSelectRange={ev => this.onSelectRange(ev)} />
      </Host>
    );
  }
}
