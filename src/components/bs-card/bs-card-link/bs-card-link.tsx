import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'bs-card-link',
  styleUrl: 'bs-card-link.scss'
})
export class CardLink {
  @Element()
  element: HTMLElement;

  @Prop()
  href: string;

  componentWillLoad() {
    this.element.classList.add('card-link');
  }

  render() {
    return (<a href={this.href}><slot /></a>);
  }
}
