import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Member } from '../../domain/models/member.model';
import { GetAllMembersUseCase } from '../../application/get-all-members-use-case';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'members-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './members-section.component.html',
  styleUrl: './members-section.component.css',
})
export class MembersSectionComponent implements OnInit {
  members: Member[] = [];
  getAllMembers = inject(GetAllMembersUseCase);

  @ViewChild('addMemberDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.getAllMembers.execute().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }

  showAddMemberDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeModal(e: MouseEvent) {
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
