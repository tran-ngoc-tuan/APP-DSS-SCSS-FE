import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiVTCNTTRoutingModule } from './ui-vtcntt-routing.module';
import { QLTKNDABCComponent } from './QL_TKND/ql-tknd-abc/ql-tknd-abc.component';
import { QLTKNDCDEComponent } from './QL_TKND/ql-tknd-cde/ql-tknd-cde.component';
import { QLTKNDDangKyComponent } from './QL_TKND/ql-tknd-dang-ky/ql-tknd-dang-ky.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiVTCNTTRoutingModule,QLTKNDABCComponent,QLTKNDCDEComponent,QLTKNDDangKyComponent
  ]
})
export class UiVTCNTTModule { }
