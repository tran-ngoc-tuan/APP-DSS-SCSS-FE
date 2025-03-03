import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantriThaotacmenuComponent } from './quantri-thaotacmenu.component';

describe('QuantriThaotacmenuComponent', () => {
  let component: QuantriThaotacmenuComponent;
  let fixture: ComponentFixture<QuantriThaotacmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantriThaotacmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantriThaotacmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
