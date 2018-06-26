import { Component, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'bs-button-group',
  styleUrl: 'bs-button-group.scss'
})
export class ButtonGroup {
  @Element()
  element: HTMLElement;

  @Prop()
  size: string;

  @Prop()
  vertical: boolean = false;

  @Watch('size')
  sizeChanged(size: string) {
    this.element.classList.remove('btn-group-lg');
    this.element.classList.remove('btn-group-sm');
    this.element.classList.add(`btn-group-${size}`);

    const buttons = this.element.querySelectorAll('bs-button');

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      (button as any).size = size;
    }
  }

  @Watch('vertical')
  verticalChanged(vertical: boolean) {
    if (vertical) {
      this.element.classList.remove('btn-group');
      this.element.classList.add('btn-group-vertical');
    } else {
      this.element.classList.remove('btn-group-vertical');
      this.element.classList.add('btn-group');
    }
  }

  componentWillLoad() {
    this.element.setAttribute('role', 'group');

    this.sizeChanged(this.size);
    this.verticalChanged(this.vertical);
  }

  render() {
    return (<slot />);
  }
}
