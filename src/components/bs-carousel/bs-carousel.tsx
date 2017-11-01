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

  @Prop()
  keyboard: boolean;

  @Prop()
  pause: string | boolean;

  @Prop()
  ride: string;

  @Prop()
  wrap: boolean;

  carousel() {
    $(this.element).carousel();
  }

  cycle() {
    $(this.element).carousel('cycle');
  }

  doPause() {
    $(this.element).carousel('pause');
  }

  prev() {
    $(this.element).carousel('prev');
  }

  next() {
    $(this.element).carousel('next');
  }

  dispose() {
    $(this.element).carousel('dispose');
  }

  componentWillLoad() {
    console.log('Carousel.componentWillLoad', this.interval, this.keyboard, this.pause, this.ride, this.wrap);

    this.element.classList.add('carousel');
    this.element.classList.add('slide');

    if (typeof this.interval !== 'undefined') {
      if (typeof this.interval === 'number') {
        // console.log('number');
        this.setAttribute('interval', this.interval.toString());
      }
    }

    if (typeof this.keyboard !== 'undefined') {
      this.setAttribute('keyboard', this.keyboard.toString());
    }

    if (typeof this.pause !== 'undefined') {
      this.setAttribute('pause', this.pause.toString());
    }

    if (typeof this.ride !== 'undefined') {
      this.setAttribute('ride', this.ride.toString());
    }

    if (typeof this.wrap !== 'undefined') {
      this.setAttribute('wrap', this.wrap.toString());
    }

  }

  componentDidLoad() {
    console.log('Carousel.componentDidLoad', this.interval, this.keyboard, this.pause, this.ride, this.wrap);
    this.carousel();
  }

  render() {
    console.log('Carousel.render', this.interval, this.keyboard, this.pause, this.ride, this.wrap);

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

  private setAttribute(name: string, value: string) {
    const typ = document.createAttribute('data-' + name);
    typ.value = value;
    this.element.attributes.setNamedItem(typ);
  }

}
