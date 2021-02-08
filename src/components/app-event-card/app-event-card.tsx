import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-event-card',
  styleUrl: 'app-event-card.css',
  shadow: true,
})
export class AppEventCard {

  render() {
    return (
      <Host>
        <div class="event-card">
          <h4>Interaction title</h4>
        </div>
      </Host>
    );
  }

}
