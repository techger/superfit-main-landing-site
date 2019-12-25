import { Directive, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[ngxLazy]'
})
export class LazyImageDirective implements OnInit {
  constructor(
    private element: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) { }

  @Input('ngxLazy') imageSource: string;

  ngOnInit() {
    if (this.element.nativeElement.tagName.toLowerCase() != 'img') {
      console.warn(`The directive ${this} only supports an img element`);
    }
    this.renderer.addClass(this.element.nativeElement, "loading-animation")
  }

  ngAfterViewInit(): void {
    const io = this.setUpObserver();
    io.observe(this.element.nativeElement);
  }

  setUpObserver() {

    return new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setAttribute(
            this.element.nativeElement,
            'src',
            this.imageSource
          );
          this.renderer.removeClass(this.element.nativeElement, "loading-animation")
          observer.disconnect();
        }
      });
    });
  }
}