import { Component, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'bs-list-group',
  styleUrl: 'bs-list-group.scss'
})
export class ListGroup {
  @Element()
  element: HTMLElement;

  @Prop()
  flush: boolean = false;

  @Watch('flush')
  flushChanged(flush: boolean) {
    if (flush) {
      this.element.classList.add('list-group-flush');
    } else {
      this.element.classList.remove('list-group-flush');
    }
  }

  componentWillLoad() {
    this.element.classList.add('list-group');

    this.flushChanged(this.flush);
  }

  render() {
    return (<slot />);
  }
}
