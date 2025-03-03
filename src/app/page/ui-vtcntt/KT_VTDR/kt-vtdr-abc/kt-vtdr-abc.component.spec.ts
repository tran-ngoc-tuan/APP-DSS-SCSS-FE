import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KTVTDRABCComponent } from './kt-vtdr-abc.component';

describe('KTVTDRABCComponent', () => {
  let component: KTVTDRABCComponent;
  let fixture: ComponentFixture<KTVTDRABCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KTVTDRABCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KTVTDRABCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
