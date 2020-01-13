import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PlatformLocation, DOCUMENT } from '@angular/common';

@Injectable()
export class SEOService {
  constructor(
    private title: Title,
    private meta: Meta,
    private platformLocation: PlatformLocation,
    @Inject(DOCUMENT) private dom

  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'title', content: title })
    this.meta.updateTag({
      name: 'og:title',
      property: "og:title",
      content: title
    })
  }

  updateOgUrl() {
    const platform = this.platformLocation as any
    const url = `${platform.location.origin}${platform.location.pathname}`
    this.meta.updateTag({ name: 'og:url', content: url })
    this.createCanonicalURL(url)
  }

  createCanonicalURL(url: string) {
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', url);
  }

  updateDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description })
    this.meta.updateTag({
      name: 'og:description',
      property: "og:description",
      content: description
    })
  }

  updateImage(url: string) {
    this.meta.updateTag({ name: 'image', content: url })
    this.meta.updateTag({
      name: 'og:image',
      property: "og:image",
      content: url
    })
  }
}