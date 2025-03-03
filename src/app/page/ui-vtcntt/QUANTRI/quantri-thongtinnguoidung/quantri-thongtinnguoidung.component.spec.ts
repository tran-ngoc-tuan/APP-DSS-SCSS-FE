import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantriThongtinnguoidungComponent } from './quantri-thongtinnguoidung.component';

describe('QuantriThongtinnguoidungComponent', () => {
  let component: QuantriThongtinnguoidungComponent;
  let fixture: ComponentFixture<QuantriThongtinnguoidungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantriThongtinnguoidungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantriThongtinnguoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
