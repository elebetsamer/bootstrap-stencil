import { Component, Element, Prop, PropDidChange, PropWillChange } from '@stencil/core';

import { themeDidChange, themeWillChange } from '../../util/functions';

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

  @PropDidChange('pill')
  didPillChangeHandler(pill: boolean) {
    if (pill) {
      this.element.classList.add('badge-pill');
    } else {
      this.element.classList.remove('badge-pill');
    }
  }

  @PropDidChange('theme')
  didThemeChangeHandler(theme: string) {
    themeDidChange(this.element, this.theme, 'badge');
  }

  @PropWillChange('theme')
  willThemeChangeHandler(theme: string) {
    themeWillChange(this.element, this.theme, 'badge');
  }

  componentWillLoad() {
    this.element.classList.add('badge');

    this.didPillChangeHandler(this.pill);
    this.didThemeChangeHandler(this.theme);
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
