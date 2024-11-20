import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavContentComponent } from './nav-content.component';

describe('NavContentComponent', () => {
  let component: NavContentComponent;
  let fixture: ComponentFixture<NavContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavContentComponent, BrowserModule,CommonModule,FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
