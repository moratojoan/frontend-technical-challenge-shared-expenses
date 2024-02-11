import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSectionComponent } from './members-section.component';
import { getAppInitialData } from '../../mocks/app-initial-data';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { of } from 'rxjs';

describe('MembersSectionComponent', () => {
  let component: MembersSectionComponent;
  let fixture: ComponentFixture<MembersSectionComponent>;

  beforeEach(async () => {
    const MemberRepositorySpy = jasmine.createSpyObj<MemberRepository>(
      'MemberRepository',
      ['getAll']
    );
    MemberRepositorySpy.getAll.and.returnValue(of(getAppInitialData().members));

    await TestBed.configureTestingModule({
      imports: [MembersSectionComponent],
      providers: [
        {
          provide: MemberRepository,
          useValue: MemberRepositorySpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MembersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of members with a name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toEqual(
      getAppInitialData().members.length
    );
  });

  it('should render a name on each list item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    items.forEach((item, index) => {
      expect(item.textContent).toContain(
        getAppInitialData().members[index].name
      );
    });
  });
});
