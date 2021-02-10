import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'app-timeline-events',
  styleUrl: 'app-timeline-events.css',
  shadow: true,
})
export class AppTimelineEvents {
  @State() range: Date[];

  onSelectRange(range: CustomEvent<Date[]>) {
    this.range = range.detail;
  }

  render() {
    return (
      <Host>
        <app-events range={this.range} />
        <div class="devider" />
        <app-timeline onSelectRange={ev => this.onSelectRange(ev)} />
      </Host>
    );
  }
}
