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
import { DialogComponent } from '../ui/dialog/dialog.component';

@Component({
  selector: 'members-section',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  templateUrl: './members-section.component.html',
  styleUrl: './members-section.component.css',
})
export class MembersSectionComponent implements OnInit {
  members: Member[] = [];
  getAllMembers = inject(GetAllMembersUseCase);
  @ViewChild(DialogComponent)
  dialog!: DialogComponent;

  ngOnInit(): void {
    this.getAllMembers.execute().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }

  handleClickAddMember() {
    this.dialog.showModal();
  }
}
