import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineProgressBarComponent } from './line-progress-bar.component';

describe('LineProgressBarComponent', () => {
  let component: LineProgressBarComponent;
  let fixture: ComponentFixture<LineProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
