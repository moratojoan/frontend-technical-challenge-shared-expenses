import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Member } from '../../domain/models/member.model';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { getAppInitialData } from '../../mocks/app-initial-data';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageMemberRepository implements MemberRepository {
  private storageKey: string = 'members';

  constructor() {
    const members = this.getAllMembers();
    const defaultMembers = getAppInitialData().members;
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(members.length > 0 ? members : defaultMembers)
    );
  }

  private getAllMembers(): Member[] {
    const members: Member[] = JSON.parse(
      localStorage.getItem(this.storageKey) ?? '[]'
    );
    return members;
  }

  getAll(): Observable<Member[]> {
    const transactions = this.getAllMembers();
    return of(transactions);
  }

  set(member: Omit<Member, 'id'>): Observable<Member> {
    const members = this.getAllMembers();
    const newMemberId = members.length + 1;
    const newMember: Member = {
      id: newMemberId,
      ...member,
    };
    const newMembers: Member[] = [...members, newMember];
    localStorage.setItem(this.storageKey, JSON.stringify(newMembers));
    return of(newMember);
  }
}
