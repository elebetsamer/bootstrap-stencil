import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'bs-card-body',
  styleUrl: 'bs-card-body.scss'
})
export class CardBody {
  @Element()
  element: HTMLElement;

  @Prop()
  cardTitle: string;

  @Prop()
  subtitle: string;

  componentWillLoad() {
    this.element.classList.add('card-body');
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
      this.renderTitle(),
      this.renderSubtitle(),
      <slot />
    ]);
  }
}
