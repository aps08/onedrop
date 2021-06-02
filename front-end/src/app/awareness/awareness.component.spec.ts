import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwarenessComponent } from './awareness.component';

describe('AwarenessComponent', () => {
  let component: AwarenessComponent;
  let fixture: ComponentFixture<AwarenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwarenessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwarenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
