import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCheckboxInputComponent } from './tags-checkbox-input.component';

describe('TagsCheckboxInputComponent', () => {
  let component: TagsCheckboxInputComponent;
  let fixture: ComponentFixture<TagsCheckboxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsCheckboxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCheckboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
