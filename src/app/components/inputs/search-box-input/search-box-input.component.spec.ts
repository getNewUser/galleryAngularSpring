import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxInputComponent } from './search-box-input.component';

describe('SearchBoxInputComponent', () => {
  let component: SearchBoxInputComponent;
  let fixture: ComponentFixture<SearchBoxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
