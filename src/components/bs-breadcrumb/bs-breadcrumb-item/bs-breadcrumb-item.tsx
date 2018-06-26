import { Component, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'bs-breadcrumb-item',
  styleUrl: 'bs-breadcrumb-item.scss'
})
export class BreadcrumbItem {
  @Element()
  element: HTMLElement;

  @Prop()
  active: boolean = false;

  @Watch('active')
  activeChanged(active: boolean) {
    if (active) {
      this.element.classList.add('active');
      this.element.setAttribute('aria-current', 'page');
    } else {
      this.element.classList.remove('active');
      this.element.removeAttribute('aria-current');
    }
  }

  componentWillLoad() {
    this.element.classList.add('breadcrumb-item');

    this.activeChanged(this.active);
  }

  render() {
    return (<slot />);
  }
}
