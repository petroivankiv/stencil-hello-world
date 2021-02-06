import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-timeline-events',
  styleUrl: 'app-timeline-events.css',
  shadow: true,
})
export class AppTimelineEvents {
  onSelectRange(range: CustomEvent<Date[]>) {
    console.log(range);
  }

  render() {
    return (
      <Host>
        <app-events />
        <div class="devider" />
        <app-timeline onSelectRange={ev => this.onSelectRange(ev)} />
      </Host>
    );
  }
}
