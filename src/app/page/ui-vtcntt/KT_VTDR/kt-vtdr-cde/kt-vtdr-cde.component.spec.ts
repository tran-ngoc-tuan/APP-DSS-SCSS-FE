import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KTVTDRCDEComponent } from './kt-vtdr-cde.component';

describe('KTVTDRCDEComponent', () => {
  let component: KTVTDRCDEComponent;
  let fixture: ComponentFixture<KTVTDRCDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KTVTDRCDEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KTVTDRCDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
