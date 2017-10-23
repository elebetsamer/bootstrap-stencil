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
  theme: string = 'primary';

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

    this.didThemeChangeHandler(this.theme);
  }

  render() {
    return (<slot />);
  }
}
