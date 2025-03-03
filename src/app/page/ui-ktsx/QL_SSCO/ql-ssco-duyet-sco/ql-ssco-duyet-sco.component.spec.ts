import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLSSCODuyetSCOComponent } from './ql-ssco-duyet-sco.component';

describe('QLSSCODuyetSCOComponent', () => {
  let component: QLSSCODuyetSCOComponent;
  let fixture: ComponentFixture<QLSSCODuyetSCOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QLSSCODuyetSCOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QLSSCODuyetSCOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
