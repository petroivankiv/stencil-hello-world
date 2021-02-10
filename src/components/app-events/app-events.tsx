import { Component, Host, h, Prop } from '@stencil/core';
import * as d3 from 'd3';

@Component({
  tag: 'app-events',
  styleUrl: 'app-events.css',
  shadow: true,
})
export class AppEvents {
  @Prop() range: Date[];
  @Prop() events;

  timeScale;
  topBase = -172;

  componentWillUpdate() {
    if (this.range) {
      this.timeScale = d3.scaleTime().domain(this.range).rangeRound([0, 320]).nice();
    }
  }

  render() {
    return (
      <Host>
        <div class="lains">
          {this.events?.map((e) => (
            <div class="wrapper">
              <div class="event-path" />
              {e.events
                .filter(ev => this.range?.[0] <= ev.date && this.range?.[1] >= ev.date)
                .map(event => {
                  const top = this.timeScale(event.date);

                  return (
                    <div class="event-card" style={{ bottom: `${top}px`, width: "350px", height: "150px" }}>
                      <app-event-card title={event.title} />
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        <div class="events">
          {this.events?.map((e, i) => (
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
