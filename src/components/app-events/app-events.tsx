import { Component, Host, h } from '@stencil/core';

import { events } from './mock';

@Component({
  tag: 'app-events',
  styleUrl: 'app-events.css',
  shadow: true,
})
export class AppEvents {

  render() {
    return (
      <Host>
        <div class="events">
          {events.map(e => (
            <div class="event">
              <span class="category">{e.category}</span>
              <span class="description">{e.description}</span>
            </div>
          ))}
        </div>
      </Host>
    );
  }

}
