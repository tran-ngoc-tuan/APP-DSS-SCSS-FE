import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantriPhanquyenmenuComponent } from './quantri-phanquyenmenu.component';

describe('QuantriPhanquyenmenuComponent', () => {
  let component: QuantriPhanquyenmenuComponent;
  let fixture: ComponentFixture<QuantriPhanquyenmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantriPhanquyenmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantriPhanquyenmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
