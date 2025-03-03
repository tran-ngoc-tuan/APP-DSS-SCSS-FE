import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLTKNDCDEComponent } from './ql-tknd-cde.component';

describe('QLTKNDCDEComponent', () => {
  let component: QLTKNDCDEComponent;
  let fixture: ComponentFixture<QLTKNDCDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QLTKNDCDEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QLTKNDCDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
