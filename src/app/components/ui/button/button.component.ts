import { Component, Input } from '@angular/core';

@Component({
  selector: 'button[custom-button]',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './button.component.css',
  host: {
    '[class.rounded]': "shape === 'rounded'",
    '[class.small]': "size === 'small'",
    '[class.big]': "size === 'big'",
  },
})
export class ButtonComponent {
  @Input() size: 'small' | 'big' = 'small';
  @Input() shape: 'default' | 'rounded' = 'default';
}
