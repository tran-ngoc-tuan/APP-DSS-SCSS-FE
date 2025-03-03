import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLSSCONhapThongTinSCOComponent } from './ql-ssco-nhap-thong-tin-sco.component';

describe('QLSSCONhapThongTinSCOComponent', () => {
  let component: QLSSCONhapThongTinSCOComponent;
  let fixture: ComponentFixture<QLSSCONhapThongTinSCOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QLSSCONhapThongTinSCOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QLSSCONhapThongTinSCOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
