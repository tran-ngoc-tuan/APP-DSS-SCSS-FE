import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardComponent } from './components/card/card.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
// third party
import { NgScrollbarModule } from 'ngx-scrollbar';


import { NgbDropdownModule, NgbNavModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFilterPipe } from './filter/data-filter.pipe';
import { DashAnalyticsComponent } from '@src/app/page/dashboard/dash-analytics.component';
@NgModule({
  imports: [
    CommonModule,
    NgScrollbarModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CardComponent,  // Import CardComponent standalone
    SpinnerComponent,  // Import SpinnerComponent if it is also standalone
    BreadcrumbComponent,  // Import BreadcrumbComponent if it is also standalone
    CommonModule  ,
    DashAnalyticsComponent,
  ],
  exports: [
    CommonModule,
    CardComponent,  // Export standalone component để dùng trong module khác
    BreadcrumbComponent,
    NgScrollbarModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerComponent,
    DataFilterPipe,
    DashAnalyticsComponent,
  ],
  declarations: [DataFilterPipe]
})

export class SharedModule {
 }
