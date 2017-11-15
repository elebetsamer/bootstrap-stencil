import { Component, Element } from '@stencil/core';

@Component({
  tag: 'bs-card-footer',
  styleUrl: 'bs-card-footer.scss'
})
export class CardFooter {
  @Element()
  element: HTMLElement;

  componentWillLoad() {
    this.element.classList.add('card-footer');
  }

  render() {
    return (<slot />);
  }
}
