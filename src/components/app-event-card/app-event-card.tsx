import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-event-card',
  styleUrl: 'app-event-card.css',
  shadow: true,
})
export class AppEventCard {
  @Prop() title: string = 'Title';

  render() {
    return (
      <Host>
        <div class="event-card">
          <h4>{this.title}</h4>
        </div>
      </Host>
    );
  }
}
