import {
  Directive,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  OnInit,
  Input,
  HostBinding,
  Renderer2
} from '@angular/core';

interface CardOptions {
  enableSticky?: boolean;
  headOverlay?: boolean;
  headLarge?: boolean;
  class?: string[];
}

@Directive({
  selector: '[showFor]'
})
export class ShowForDirective implements AfterViewInit, OnDestroy, OnInit {
    card: any;
    currUserRole: any;
    allPermissions: any = [];

    @Input() options: CardOptions;
    @Input('showFor') roles: any;
    @HostBinding('class') class: any;
    constructor(
    private el: ElementRef,
    public renderer: Renderer2,
  ) {
    this.class = this.el.nativeElement.classList;
  }

  ngOnChanges() {
    if (!window.localStorage.getItem('permissions')) {
      console.log('You do not have permissions ');
    }
    this.allPermissions = JSON.parse(window.localStorage.getItem('permissions')) || [];
    let pos = this.allPermissions.indexOf(this.roles);
    console.log('** ', this.allPermissions, pos);
    if (pos == -1) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  ngOnInit():
   void {
    }
  ngAfterViewInit():
   void {
        }
  ngOnDestroy():
   void {
        }
}
