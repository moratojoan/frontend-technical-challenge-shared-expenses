import { Observable } from 'rxjs';
import { MemberRepository } from '../domain/repositories/member.repository';
import { Injectable } from '@angular/core';
import { Member } from '../domain/models/member.model';

@Injectable({
  providedIn: 'root',
})
export class GetAllMembersUseCase {
  memberRepository: MemberRepository;
  constructor(memberRepository: MemberRepository) {
    this.memberRepository = memberRepository;
  }

  execute(): Observable<Member[]> {
    return this.memberRepository.getAll();
  }
}
