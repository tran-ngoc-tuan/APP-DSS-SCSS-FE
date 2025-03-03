import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveMenuItemComponent } from './recursive-menu-item.component';

describe('RecursiveMenuItemComponent', () => {
  let component: RecursiveMenuItemComponent;
  let fixture: ComponentFixture<RecursiveMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursiveMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursiveMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
