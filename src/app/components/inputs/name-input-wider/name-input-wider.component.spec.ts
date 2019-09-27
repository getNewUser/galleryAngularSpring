import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameInputWiderComponent } from './name-input-wider.component';

describe('NameInputWiderComponent', () => {
  let component: NameInputWiderComponent;
  let fixture: ComponentFixture<NameInputWiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameInputWiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameInputWiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
