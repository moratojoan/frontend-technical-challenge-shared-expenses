import { Component, Input } from '@angular/core';

@Component({
  selector: 'button[custom-button]',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './button.component.css',
})
export class ButtonComponent {}
