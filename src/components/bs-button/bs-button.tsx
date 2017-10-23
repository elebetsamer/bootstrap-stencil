import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'bs-button',
  styleUrl: 'bs-button.scss'
})
export class Button {
  @Element()
  element: HTMLElement;

  @Prop()
  buttonType: string = 'button';

  @Prop()
  theme: string = 'primary';

  render() {
    const classes = `btn btn-${this.theme}`;

    return (
      <button type={this.buttonType} class={classes}><slot /></button>
    );
  }
}
