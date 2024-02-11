import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-dialog',
  standalone: true,
  imports: [],
  template: `<dialog #customDialog (click)="closeModalOnClickOutside($event)">
    <ng-content></ng-content>
  </dialog>`,
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  @ViewChild('customDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;

  showModal() {
    this.dialog.nativeElement.showModal();
  }

  closeModal() {
    this.dialog.nativeElement.close();
  }

  closeModalOnClickOutside(e: MouseEvent) {
    const dialog = this.dialog.nativeElement;
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  }
}
