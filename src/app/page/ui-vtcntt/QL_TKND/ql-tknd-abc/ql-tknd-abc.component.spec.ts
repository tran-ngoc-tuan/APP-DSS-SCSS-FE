import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QLTKNDABCComponent } from './ql-tknd-abc.component';

describe('QLTKNDABCComponent', () => {
  let component: QLTKNDABCComponent;
  let fixture: ComponentFixture<QLTKNDABCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QLTKNDABCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QLTKNDABCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
