import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreApexComponent } from './core-apex.component';

describe('CoreApexComponent', () => {
  let component: CoreApexComponent;
  let fixture: ComponentFixture<CoreApexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreApexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreApexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
