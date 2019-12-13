import { Directive, ElementRef, OnInit, Renderer2, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Directive({
  selector: '[ngxLazy]'
})
export class LazyImageDirective implements OnInit {
  constructor(
    private element: ElementRef<HTMLImageElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
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
    // io.observe(this.element.nativeElement);
  }

  setUpObserver() {

  }
}