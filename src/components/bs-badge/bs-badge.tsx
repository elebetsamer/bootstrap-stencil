import { Component, Element, Prop, Watch } from '@stencil/core';

import { themeChanged } from '../../util/functions';

@Component({
  tag: 'bs-badge',
  styleUrl: 'bs-badge.scss'
})
export class Badge {
  @Element()
  element: HTMLElement;

  @Prop()
  href: string;

  @Prop()
  pill: boolean = false;

  @Prop()
  theme: string = 'primary';

  @Watch('pill')
  pillChanged(pill: boolean) {
    if (pill) {
      this.element.classList.add('badge-pill');
    } else {
      this.element.classList.remove('badge-pill');
    }
  }

  @Watch('theme')
  themeChanged(newTheme: string, oldTheme: string) {
    themeChanged(this.element, newTheme, oldTheme, 'badge');
  }

  componentWillLoad() {
    this.element.classList.add('badge');

    this.pillChanged(this.pill);
    this.themeChanged(this.theme, null);
  }

  render() {
    if (this.href) {
      let classes = {
        'badge': true,
        'badge-pill': this.pill
      }

      classes[`badge-${this.theme}`] = true;

      // Since we are styling the anchor tag, we don't need the main element to have the badge classes
      this.element.classList.remove('badge');
      this.element.classList.remove('badge-pill');
      this.element.classList.remove(`badge-${this.theme}`);

      return (
        <a href={this.href} class={classes}>
          <slot />
        </a>
      );
    }

    return (<slot />);
  }
}
