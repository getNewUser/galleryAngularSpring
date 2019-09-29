import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesInputComponent } from './categories-input.component';

describe('CategoriesInputComponent', () => {
  let component: CategoriesInputComponent;
  let fixture: ComponentFixture<CategoriesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
