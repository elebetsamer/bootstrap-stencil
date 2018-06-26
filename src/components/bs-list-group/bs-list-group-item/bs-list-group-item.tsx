import { Component, Element, Prop, Watch } from '@stencil/core';

import { themeChanged } from '../../../util/functions';

@Component({
  tag: 'bs-list-group-item',
  styleUrl: 'bs-list-group-item.scss'
})
export class ListGroupItem {
  @Element()
  element: HTMLElement;

  @Prop()
  active: boolean = false;

  @Prop()
  button: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  href: string;

  @Prop()
  theme: string = '';

  @Watch('active')
  activeChanged(active: boolean) {
    if (active) {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  @Watch('button')
  buttonChanged(button: boolean) {
    if (button) {
      this.element.classList.add('list-group-item-action');
    } else {
      // We don't want to remove the class if this group item has an href
      if (!this.href) {
        this.element.classList.remove('list-group-item-action');
      }
    }
  }

  @Watch('disabled')
  disabledChanged(disabled: boolean) {
    if (disabled) {
      this.element.classList.add('disabled');
    } else {
      this.element.classList.remove('disabled');
    }
  }

  @Watch('href')
  hrefChanged(href: string) {
    if (href) {
      this.element.classList.add('list-group-item-action');
    } else {
      // We don't want to remove the class if this group item is marked as a button
      if (!this.button) {
        this.element.classList.remove('list-group-item-action');
      }
    }
  }

  @Watch('theme')
  themeChanged(newTheme: string, oldTheme: string) {
    themeChanged(this.element, newTheme, oldTheme, 'list-group-item');
  }

  componentWillLoad() {
    this.element.classList.add('list-group-item');

    this.activeChanged(this.active);
    this.buttonChanged(this.button);
    this.disabledChanged(this.disabled);
    this.themeChanged(this.theme, null);
    this.hrefChanged(this.href);
  }

  render() {
    if (this.href) {
      return (
        <a href={this.href}><slot /></a>
      );
    }

    if (this.button) {
      if (this.disabled) {
        return (
          <button type="button" disabled><slot /></button>
        );
      }

      return (
        <button type="button"><slot /></button>
      );
    }

    return (<slot />);
  }
}
