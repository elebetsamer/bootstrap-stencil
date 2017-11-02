import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'bs-carousel',
  styleUrl: 'bs-carousel.scss'
})
export class Carousel {
  static uniqueId: number = 0;

  @Element()
  element: HTMLElement;

  @Prop()
  id: string;

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

  @Prop()
  slidesOnly: boolean = false;

  @Prop()
  withIndicators: boolean = false;

  carousel() {
    $(this.element).carousel();

    $(this.element).on('slide.bs.carousel', function () {
      // console.log('wowowowow');
    });

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

  renderNavControls() {
    if (this.slidesOnly) {
      return;
    } else {
      return ([
        <a class="carousel-control-prev" href={this.getHashName()} role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>,
        <a class="carousel-control-next" href={this.getHashName()} role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      ]
      );
    }
  }

  renderWithIndicators() {
    if (this.withIndicators) {
      return (

        <ol class="carousel-indicators">
          <li data-target={this.getHashName()} data-slide-to="0" class="active"></li>
          <li data-target={this.getHashName()} data-slide-to="1"></li>
          <li data-target={this.getHashName()} data-slide-to="2"></li>
        </ol>

      )
    } else {
      return;
    }
  }

  componentWillLoad() {
    console.log('Carousel.componentWillLoad', this.id, this.interval, this.keyboard, this.pause, this.ride, this.wrap);

    if (typeof this.id === 'undefined' || this.id === '') {
      Carousel.uniqueId++;
      const id = "Carousel" + Carousel.uniqueId.toString();
      this.setId(id);
    }


    this.element.classList.add('carousel');
    this.element.classList.add('slide');

    if (typeof this.interval !== 'undefined') {
      if (typeof this.interval === 'number') {
        // console.log('number');
        this.setProperty('interval', this.interval.toString());
      }
    }

    if (typeof this.keyboard !== 'undefined') {
      this.setProperty('keyboard', this.keyboard.toString());
    }

    if (typeof this.pause !== 'undefined') {
      this.setProperty('pause', this.pause.toString());
    }

    if (typeof this.ride !== 'undefined') {
      this.setProperty('ride', this.ride.toString());
    }

    if (typeof this.wrap !== 'undefined') {
      this.setProperty('wrap', this.wrap.toString());
    }

  }

  componentDidLoad() {
    console.log('Carousel.componentDidLoad', this.interval, this.keyboard, this.pause, this.ride, this.wrap);

    // this.element.addEventListener('click', function (e) { console.log('yes yes yes') }, false);

    this.carousel();
  }

  render() {
    console.log('Carousel.render', this.id, this.interval, this.keyboard, this.pause, this.ride, this.wrap);

    return ([
      this.renderWithIndicators(),
      <div class="carousel-inner">
        <slot name="items" />
      </div>,
        this.renderNavControls()
    ]);
  }

  private setId(id: string) {
    const typ = document.createAttribute('id');
    typ.value = id;
    this.element.attributes.setNamedItem(typ);
  }

  private setProperty(name: string, value: string) {
    const typ = document.createAttribute('data-' + name);
    typ.value = value;
    this.element.attributes.setNamedItem(typ);
  }

  private getHashName(): string {
    // if (typeof this.id === 'undefined' || this.id === '') {
    //   Carousel.uniqueId++;
    //   const id = "Carousel" + Carousel.uniqueId.toString();
    //   return "#" + id;
    // }

    return "#" + this.id;
  }

}
