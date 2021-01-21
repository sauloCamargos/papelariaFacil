import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[scInput]'
})
export class ScInputDirective {

  constructor(private el: ElementRef, private control: NgControl) {
    this.validateField();
  }

  @HostListener('keyup') onKeyUp() {
    this.validateField();
  }
  @HostListener('blur') onBlur() {
    this.validateField();
  }

  validateField() {
    var domElement: HTMLElement = this.el.nativeElement;
    domElement.closest('.form-group').classList.remove('invalid-group')
    domElement.closest('.form-group').classList.remove('valid-group')

    if (this.control.invalid && (this.control.touched || this.control.dirty)) {
      domElement.closest('.form-group').classList.add('invalid-group')
    }

    if (this.control.valid) {
      domElement.closest('.form-group').classList.add('valid-group')
    }
  }

}
