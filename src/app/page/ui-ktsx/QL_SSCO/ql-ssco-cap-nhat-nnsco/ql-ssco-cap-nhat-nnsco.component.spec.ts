import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLSSCOCapNhatNNSCOComponent } from './ql-ssco-cap-nhat-nnsco.component';

describe('QLSSCOCapNhatNNSCOComponent', () => {
  let component: QLSSCOCapNhatNNSCOComponent;
  let fixture: ComponentFixture<QLSSCOCapNhatNNSCOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QLSSCOCapNhatNNSCOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QLSSCOCapNhatNNSCOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
