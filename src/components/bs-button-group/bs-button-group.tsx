import { Component, Element, Prop, PropDidChange } from '@stencil/core';

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

  @PropDidChange('size')
  sizeDidChangeHandler(size: string) {
    this.element.classList.remove('btn-group-lg');
    this.element.classList.remove('btn-group-sm');
    this.element.classList.add(`btn-group-${size}`);

    const buttons = this.element.querySelectorAll('bs-button');

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      (button as any).size = size;
    }
  }

  @PropDidChange('vertical')
  verticalDidChangeHandler(vertical: boolean) {
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

    this.sizeDidChangeHandler(this.size);
    this.verticalDidChangeHandler(this.vertical);
  }

  render() {
    return (<slot />);
  }
}
