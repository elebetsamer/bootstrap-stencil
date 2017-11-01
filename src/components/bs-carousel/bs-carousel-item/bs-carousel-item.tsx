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

  componentWillLoad() {
    this.element.classList.add('carousel-item');
  }

  componentDidLoad() {
    if (this.active) {
      this.element.classList.add('active');
    }
  }

  // componentDidUpdate() {
  //   if (this.active) {
  //     this.element.classList.add('active');
  //   } else {
  //     this.element.classList.remove('active');
  //   }
  // }

  render() {
    console.log('CarouselItem->render');
    return (
      <img class="d-block w-100" src={this.src} alt={this.alt} />
    );
  }
}
