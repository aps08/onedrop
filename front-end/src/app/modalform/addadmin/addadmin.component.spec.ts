import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddadminComponent } from './addadmin.component';

describe('AddadminComponent', () => {
  let component: AddadminComponent;
  let fixture: ComponentFixture<AddadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
