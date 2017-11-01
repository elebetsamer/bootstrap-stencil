import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'bs-carousel',
  styleUrl: 'bs-carousel.scss'
})
export class Carousel {
  @Element()
  element: HTMLElement;

  @Prop()
  interval: number;

  componentWillLoad() {
    this.element.classList.add('carousel');
    this.element.classList.add('slide');
  }

  componentDidLoad() {
    $('.carousel').carousel();
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
