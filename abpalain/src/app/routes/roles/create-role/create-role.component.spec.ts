import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRoleComponent } from './create-role.component';

describe('CreateRoleComponent', () => {
  let component: CreateRoleComponent;
  let fixture: ComponentFixture<CreateRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
