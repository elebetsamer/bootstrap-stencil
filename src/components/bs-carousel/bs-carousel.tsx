import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'bs-carousel',
  styleUrl: 'bs-carousel.scss'
})
export class Carousel {
  @Element()
  element: HTMLElement;

  componentWillLoad() {
    this.element.classList.add('carousel');
    this.element.classList.add('slide');

    const typ = document.createAttribute('data-ride');
    typ.value = 'carousel';
    this.element.attributes.setNamedItem(typ);
  }

  render() {
    return ([
      <div class="carousel-inner">
        <slot name="items" />
      </div>,
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>,
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
          ]);
  }
}
