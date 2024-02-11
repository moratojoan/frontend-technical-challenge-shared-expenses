import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

export abstract class MemberRepository {
  abstract getAll(): Observable<Member[]>;
  abstract set(member: Omit<Member, 'id'>): Observable<Member>;
}
