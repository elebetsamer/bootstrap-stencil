import { Component, Element } from '@stencil/core';

@Component({
  tag: 'bs-breadcrumb',
  styleUrl: 'bs-breadcrumb.scss'
})
export class Breadcrumb {
  @Element()
  element: HTMLElement;

  componentWillLoad() {
    this.element.classList.add('breadcrumb');
  }

  render() {
    return (<slot />);
  }
}
