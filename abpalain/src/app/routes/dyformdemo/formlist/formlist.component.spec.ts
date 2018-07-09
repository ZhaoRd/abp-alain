import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormlistComponent } from './formlist.component';

describe('FormlistComponent', () => {
  let component: FormlistComponent;
  let fixture: ComponentFixture<FormlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
