import { Component, Element, Prop, PropDidChange, PropWillChange } from '@stencil/core';

import { themeDidChange, themeWillChange } from '../../util/functions';

@Component({
  tag: 'bs-card',
  styleUrl: 'bs-card.scss'
})
export class Card {
  @Element()
  element: HTMLElement;

  @Prop()
  footer: string;

  @Prop()
  header: string;

  @Prop()
  imageBottom: string;

  @Prop()
  imageTop: string;

  @Prop()
  subtitle: string;

  @Prop()
  cardTitle: string;

  @Prop()
  theme: string = '';

  @PropDidChange('theme')
  didThemeChangeHandler(theme: string) {
    themeDidChange(this.element, this.theme, 'bg');

    this.element.classList.remove('text-white');

    if (theme && theme !== 'light') {
      this.element.classList.add('text-white');
    }
  }

  @PropWillChange('theme')
  willThemeChangeHandler(theme: string) {
    themeWillChange(this.element, this.theme, 'bg');
  }

  componentWillLoad() {
    this.element.classList.add('card');

    this.didThemeChangeHandler(this.theme);
  }

  renderFooter() {
    if (this.footer) {
      return (<div class="card-header">{this.footer}</div>);
    }

    return null;
  }

  renderHeader() {
    if (this.header) {
      return (<div class="card-header">{this.header}</div>);
    }

    return null;
  }

  renderImageBottom() {
    if (this.imageBottom) {
      return (<img class="card-img-bottom" src={this.imageBottom} />);
    }

    return null;
  }

  renderImageTop() {
    if (this.imageTop) {
      return (<img class="card-img-top" src={this.imageTop} />);
    }

    return null;
  }

  renderSubtitle() {
    if (this.subtitle) {
      return (<h6 class="card-subtitle mb-2">{this.subtitle}</h6>);
    }

    return null;
  }

  renderTitle() {
    if (this.cardTitle) {
      return (<h4 class="card-title">{this.cardTitle}</h4>);
    }

    return null;
  }

  render() {
    return ([
      this.renderHeader(),
      this.renderImageTop(),
      <div class="card-body">
        {this.renderTitle()}
        {this.renderSubtitle()}
        <slot />
      </div>,
      this.renderImageBottom(),
      this.renderFooter()
    ]);
  }
}
