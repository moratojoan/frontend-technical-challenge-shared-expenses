import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSectionComponent } from './members-section.component';
import { getAppInitialData } from '../../mocks/app-initial-data';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { of } from 'rxjs';

describe('MembersSectionComponent', () => {
  let component: MembersSectionComponent;
  let fixture: ComponentFixture<MembersSectionComponent>;
  let MemberRepositorySpy: jasmine.SpyObj<MemberRepository>;

  beforeEach(async () => {
    MemberRepositorySpy = jasmine.createSpyObj<MemberRepository>(
      'MemberRepository',
      ['getAll', 'set']
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

  it('should open a modal when click the button', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    button?.click();
    await fixture.whenStable();
    const dialog = compiled.querySelector('dialog') as HTMLDialogElement;
    expect(dialog.hasAttribute('open')).toBeTruthy();
  });

  it('should set a new member', async () => {
    const newName = 'Texto de prueba';
    MemberRepositorySpy.set.and.returnValue(of({ id: 4, name: newName }));

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    const dialog = compiled.querySelector('dialog') as HTMLDialogElement;
    const input = dialog.querySelector('input') as HTMLInputElement;
    const submitButton = dialog.querySelector(
      "button[type='submit']"
    ) as HTMLButtonElement;

    input.value = newName;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    submitButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(dialog.hasAttribute('open')).toBeFalsy();
    const item =
      compiled.querySelectorAll('li')[getAppInitialData().members.length];
    expect(item.textContent).toContain(newName);
  });
});
