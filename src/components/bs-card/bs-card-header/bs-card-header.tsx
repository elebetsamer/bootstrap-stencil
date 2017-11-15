import { Component, Element } from '@stencil/core';

@Component({
  tag: 'bs-card-header',
  styleUrl: 'bs-card-header.scss'
})
export class CardHeader {
  @Element()
  element: HTMLElement;

  componentWillLoad() {
    this.element.classList.add('card-header');
  }

  render() {
    return (<slot />);
  }
}
