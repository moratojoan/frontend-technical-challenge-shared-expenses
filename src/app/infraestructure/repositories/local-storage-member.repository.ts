import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Member } from '../../domain/models/member.model';
import { MemberRepository } from '../../domain/repositories/member.repository';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageMemberRepository implements MemberRepository {
  private storageKey: string = 'members';

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
}
