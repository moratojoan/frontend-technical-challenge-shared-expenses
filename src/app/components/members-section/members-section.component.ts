import { Component, OnInit, inject } from '@angular/core';
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

  ngOnInit(): void {
    this.getAllMembers.execute().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }
}
