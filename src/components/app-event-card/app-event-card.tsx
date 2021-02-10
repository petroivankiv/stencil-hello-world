import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-event-card',
  styleUrl: 'app-event-card.css',
  shadow: true,
})
export class AppEventCard {
  @Prop() cardTitle: string = 'Title';

  render() {
    return (
      <Host>
        <div class="event-card">
          <h4>{this.cardTitle}</h4>
        </div>
      </Host>
    );
  }
}
