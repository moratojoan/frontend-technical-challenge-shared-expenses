import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../domain/models/member.model';
import { GetAllMembersUseCase } from '../../application/get-all-members-use-case';
import { ButtonComponent } from '../ui/button/button.component';
import { DialogComponent } from '../ui/dialog/dialog.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SetMemberUseCase } from '../../application/set-member-use-case';

@Component({
  selector: 'members-section',
  standalone: true,
  imports: [ButtonComponent, DialogComponent, ReactiveFormsModule],
  templateUrl: './members-section.component.html',
  styleUrl: './members-section.component.css',
})
export class MembersSectionComponent implements OnInit {
  members: Member[] = [];
  getAllMembers = inject(GetAllMembersUseCase);
  setMember = inject(SetMemberUseCase);
  @ViewChild(DialogComponent) dialog!: DialogComponent;
  addMemberForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

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

  submitMember() {
    if (this.addMemberForm.valid) {
      this.setMember
        .execute(this.addMemberForm.value.name ?? '')
        .subscribe((member) => {
          this.members = [...this.members, member];
          this.dialog.closeModal();
        });
    }
  }
}
