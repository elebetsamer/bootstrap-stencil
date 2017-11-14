import { Component, Element, Prop, PropDidChange, PropWillChange } from '@stencil/core';

import { themeDidChange, themeWillChange } from '../../../util/functions';

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

  @PropDidChange('active')
  activeDidChangeHandler(active: boolean) {
    if (active) {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }

  @PropDidChange('button')
  buttonDidChangeHandler(button: boolean) {
    if (button) {
      this.element.classList.add('list-group-item-action');
    } else {
      // We don't want to remove the class if this group item has an href
      if (!this.href) {
        this.element.classList.remove('list-group-item-action');
      }
    }
  }

  @PropDidChange('disabled')
  disabledDidChangeHandler(disabled: boolean) {
    if (disabled) {
      this.element.classList.add('disabled');
    } else {
      this.element.classList.remove('disabled');
    }
  }

  @PropDidChange('href')
  hrefDidChangeHandler(href: string) {
    if (href) {
      this.element.classList.add('list-group-item-action');
    } else {
      // We don't want to remove the class if this group item is marked as a button
      if (!this.button) {
        this.element.classList.remove('list-group-item-action');
      }
    }
  }

  @PropDidChange('theme')
  didThemeChangeHandler(theme: string) {
    themeDidChange(this.element, this.theme, 'list-group-item');
  }

  @PropWillChange('theme')
  willThemeChangeHandler(theme: string) {
    themeWillChange(this.element, this.theme, 'list-group-item');
  }

  componentWillLoad() {
    this.element.classList.add('list-group-item');

    this.activeDidChangeHandler(this.active);
    this.buttonDidChangeHandler(this.button);
    this.disabledDidChangeHandler(this.disabled);
    this.didThemeChangeHandler(this.theme);
    this.hrefDidChangeHandler(this.href);
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
