import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'bs-carousel-item',
  styleUrl: 'bs-carousel-item.scss'
})
export class CarouselItem {
  @Element()
  element: HTMLElement;

  @Prop()
  src: string;

  @Prop()
  alt: string;

  @Prop()
  active = false;

  hasContent = false;

  componentWillLoad() {
    console.log('CarouselItem.componentWillLoad', this.element.children);
    this.element.classList.add('carousel-item');

    this.hasContent = this.element.children.length > 0;
  }

  componentDidLoad() {
    console.log('CarouselItem.componentDidLoad', this.element.children);
    if (this.active) {
      this.element.classList.add('active');
    }
  }

  renderCaption() {
    if (!this.hasContent) {
      return;
    } else {
      return (
        <div class="carousel-caption d-none d-md-block">
          <slot />
        </div>
      )
    }
  }

  render() {
    console.log('CarouselItem->render');
    return ([
      <img class="d-block w-100 img-fluid" src={this.src} alt={this.alt} />,
      this.renderCaption()
    ]
    );
  }
}
