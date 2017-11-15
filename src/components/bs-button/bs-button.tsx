import { Component, Element, Prop, PropDidChange } from '@stencil/core';

@Component({
  tag: 'bs-button',
  styleUrl: 'bs-button.scss'
})
export class Button {
  @Element()
  element: HTMLElement;

  @Prop()
  block: boolean = false;

  @PropDidChange('block')
  blockPropDidChange(block: boolean) {
    if (block) {
      this.element.setAttribute('block', 'true');
    } else {
      this.element.removeAttribute('block');
    }
  }

  @Prop()
  buttonType: string = 'button';

  @Prop()
  disabled: boolean = false;

  @Prop()
  href: string;

  @Prop()
  outline: boolean = false;

  @Prop()
  size: string;

  @Prop()
  theme: string = 'primary';

  @Prop()
  value: string;

  render() {
    const classes = {
      btn: true,
      "btn-block": this.block
    };

    if (this.outline) {
      classes[`btn-outline-${this.theme}`] = true;
    } else {
      classes[`btn-${this.theme}`] = true;
    }

    if (this.size) {
      classes[`btn-${this.size}`] = true;
    }

    if (this.href) {
      if (this.disabled) {
        classes['disabled'] = true;
      }

      if (this.buttonType !== 'button') {
        if (this.disabled) {
          return (
            <a href={this.href} class={classes} aria-disabled="true"><slot /></a>
          );
        }

        return (
          <a href={this.href} class={classes}><slot /></a>
        );
      } else {
        if (this.disabled) {
          return (
            <a href={this.href} class={classes} role="button" aria-disabled="true"><slot /></a>
          );
        }

        return (
          <a href={this.href} class={classes} role="button"><slot /></a>
        );
      }
    }

    if (this.value) {
      if (this.disabled) {
        return (
          <input type={this.buttonType} class={classes} value={this.value} disabled />
        );
      }

      return (
        <input type={this.buttonType} class={classes} value={this.value} />
      );
    }

    if (this.disabled) {
      return (
        <button type={this.buttonType} class={classes} disabled><slot /></button>
      );
    }

    return (
      <button type={this.buttonType} class={classes}><slot /></button>
    );
  }
}
