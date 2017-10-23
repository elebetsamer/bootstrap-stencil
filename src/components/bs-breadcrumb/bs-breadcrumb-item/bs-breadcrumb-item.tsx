import { Component, Element, Prop, PropDidChange } from '@stencil/core';

@Component({
  tag: 'bs-breadcrumb-item',
  styleUrl: 'bs-breadcrumb-item.scss'
})
export class BreadcrumbItem {
  @Element()
  element: HTMLElement;

  @Prop()
  active: boolean = false;

  @PropDidChange('active')
  didActiveChangeHandler(active: boolean) {
    if (active) {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  componentWillLoad() {
    this.element.classList.add('breadcrumb-item');

    this.didActiveChangeHandler(this.active);
  }

  render() {
    return (<slot />);
  }
}
