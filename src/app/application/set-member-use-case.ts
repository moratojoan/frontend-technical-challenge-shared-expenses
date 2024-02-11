import { Observable } from 'rxjs';
import { MemberRepository } from '../domain/repositories/member.repository';
import { Injectable } from '@angular/core';
import { Member } from '../domain/models/member.model';

@Injectable({
  providedIn: 'root',
})
export class SetMemberUseCase {
  memberRepository: MemberRepository;
  constructor(memberRepository: MemberRepository) {
    this.memberRepository = memberRepository;
  }

  execute(name: string): Observable<Member> {
    const member: Omit<Member, 'id'> = { name };
    return this.memberRepository.set(member);
  }
}
