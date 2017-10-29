import { Component, Element, Method, Prop, PropDidChange, PropWillChange } from '@stencil/core';

import { themeDidChange, themeWillChange } from '../../util/functions';

@Component({
  tag: 'bs-alert',
  styleUrl: 'bs-alert.scss'
})
export class Alert {
  @Element()
  element: HTMLElement;

  @Prop()
  dismissible: boolean = false;

  @Prop()
  heading: string;

  @Prop()
  processLinks: boolean = true;

  @Prop()
  theme: string = 'primary';

  @PropDidChange('dismissible')
  didDismissibleChangeHandler(dismissible: boolean) {
    if (dismissible) {
      this.element.classList.add('alert-dismissible');
    } else {
      this.element.classList.remove('alert-dismissible');
    }
  }

  @PropDidChange('theme')
  didThemeChangeHandler(theme: string) {
    themeDidChange(this.element, this.theme, 'alert');
  }

  @PropWillChange('theme')
  willThemeChangeHandler(theme: string) {
    themeWillChange(this.element, this.theme, 'alert');
  }

  @Method()
  dismiss() {
    this.handleDismiss();
  }

  componentDidUnload() {
    console.log('The alert has been removed from the DOM');
  }

  componentWillLoad() {
    this.element.classList.add('alert');
    this.element.setAttribute('role', 'alert');

    this.didDismissibleChangeHandler(this.dismissible);
    this.didThemeChangeHandler(this.theme);
  }

  handleDismiss(event?: UIEvent) {
    if (event) {
      event.preventDefault();
    }

    this.element.remove();
  }

  renderCloseButton() {
    if (this.dismissible) {
      return (
        <button type="button" class="close" aria-label="Close" onClick={(event: UIEvent) => this.handleDismiss(event)}>
          <span aria-hidden="true">&times;</span>
        </button>
      )
    }

    return null;
  }

  renderHeading() {
    if (this.heading) {
      return (
        <h4 class="alert-heading">{this.heading}</h4>
      )
    }
  }

  render() {
    if (this.processLinks) {
      const links = this.element.querySelectorAll('a');

      for (let i = 0; i < links.length; ++i) {
        links[i].classList.add('alert-link');
      }
    }

    return ([
      this.renderHeading(),
      <slot />,
      this.renderCloseButton()
    ]);
  }
}
