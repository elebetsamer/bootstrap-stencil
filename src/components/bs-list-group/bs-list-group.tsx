import { Component, Element, Prop, PropDidChange } from '@stencil/core';

@Component({
  tag: 'bs-list-group',
  styleUrl: 'bs-list-group.scss'
})
export class ListGroup {
  @Element()
  element: HTMLElement;

  @Prop()
  flush: boolean = false;

  @PropDidChange('flush')
  flushDidChangeHandler(flush: boolean) {
    if (flush) {
      this.element.classList.add('list-group-flush');
    } else {
      this.element.classList.remove('list-group-flush');
    }
  }

  componentWillLoad() {
    this.element.classList.add('list-group');

    this.flushDidChangeHandler(this.flush);
  }

  render() {
    return (<slot />);
  }
}
