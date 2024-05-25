import { ContentChild, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private r2: Renderer2) { }

  toggleColor = false;

  @ContentChild('dropdownBtn', { static: true }) dropdownBtn!: ElementRef<HTMLButtonElement>;
  @ContentChild('menu', { static: true }) menu!: ElementRef<HTMLDListElement>;

  @HostListener('click', ['$event']) onClick(event: any) {
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  ngAfterViewInit(): void {
    this.r2.listen(this.dropdownBtn.nativeElement, 'click', () => {
      this.menu.nativeElement.classList.toggle('show');
    });
    this.r2.listen(this.menu.nativeElement, 'click', () => {
      this.menu.nativeElement.classList.remove('show');
    })
    this.r2.listen('window', 'click', () => {
      this.menu.nativeElement.classList.remove('show');
    })
  }

}
