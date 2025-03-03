import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLTKNDDangKyComponent } from './ql-tknd-dang-ky.component';

describe('QLTKNDDangKyComponent', () => {
  let component: QLTKNDDangKyComponent;
  let fixture: ComponentFixture<QLTKNDDangKyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QLTKNDDangKyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QLTKNDDangKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
