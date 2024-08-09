import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendControlComponent } from './legend-control.component';

describe('LegendControlComponent', () => {
  let component: LegendControlComponent;
  let fixture: ComponentFixture<LegendControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegendControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
