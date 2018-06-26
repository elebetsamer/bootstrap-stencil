import { Component, Element, Prop, Watch } from '@stencil/core';

import { themeChanged } from '../../util/functions';

@Component({
  tag: 'bs-card',
  styleUrl: 'bs-card.scss'
})
export class Card {
  @Element()
  element: HTMLElement;

  @Prop()
  body: boolean = true;

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

  @Watch('theme')
  themeChanged(newTheme: string, oldTheme) {
    themeChanged(this.element, newTheme, oldTheme, 'bg');

    this.element.classList.remove('text-white');

    if (newTheme && newTheme !== 'light') {
      this.element.classList.add('text-white');
    }
  }

  componentWillLoad() {
    this.element.classList.add('card');

    this.themeChanged(this.theme, null);
  }

  renderBody() {
    if (this.body) {
      return (
        <bs-card-body cardTitle={this.cardTitle} subtitle={this.subtitle}>
          <slot />
        </bs-card-body>
      );
    }

    return ([
        this.renderTitle(),
        this.renderSubtitle(),
        <slot />
    ]);
  }

  renderFooter() {
    if (this.footer) {
      return (<bs-card-footer>{this.footer}</bs-card-footer>);
    }

    return null;
  }

  renderHeader() {
    if (this.header) {
      return (<bs-card-header>{this.header}</bs-card-header>);
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
      return (<h6 class="card-subtitle mb-2 text-muted">{this.subtitle}</h6>);
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
      this.renderBody(),
      this.renderImageBottom(),
      this.renderFooter()
    ]);
  }
}
