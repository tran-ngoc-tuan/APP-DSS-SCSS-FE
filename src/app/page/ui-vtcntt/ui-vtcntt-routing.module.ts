import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@src/app/guards/auth.guard';
import { QLTKNDDangKyComponent } from './QL_TKND/ql-tknd-dang-ky/ql-tknd-dang-ky.component';
import { QLTKNDCDEComponent } from './QL_TKND/ql-tknd-cde/ql-tknd-cde.component';
import { QLTKNDABCComponent } from './QL_TKND/ql-tknd-abc/ql-tknd-abc.component';
import { KTVTDRABCComponent } from './KT_VTDR/kt-vtdr-abc/kt-vtdr-abc.component';
import { KTVTDRCDEComponent } from './KT_VTDR/kt-vtdr-cde/kt-vtdr-cde.component';
import { QuantriThaotacmenuComponent } from './QUANTRI/quantri-thaotacmenu/quantri-thaotacmenu.component';
import { QuantriPhanquyenmenuComponent } from './QUANTRI/quantri-phanquyenmenu/quantri-phanquyenmenu.component';
import { QuantriThongtinnguoidungComponent } from './QUANTRI/quantri-thongtinnguoidung/quantri-thongtinnguoidung.component';

const routes: Routes = [
  {
    path: 'QL_TKND',
    children: [
      { path: 'qltkndabc', component: QLTKNDABCComponent, canActivate: [authGuard] },
      { path: 'qltkndcde', component: QLTKNDCDEComponent, canActivate: [authGuard] },
      { path: 'qltknddang-ky', component: QLTKNDDangKyComponent, canActivate: [authGuard] }
    ]
  },
  {
    path: 'KTVTDR',
    children: [
      { path: 'ktvtdrabc', component: KTVTDRABCComponent, canActivate: [authGuard] },
      { path: 'ktvtdrcde', component: KTVTDRCDEComponent, canActivate: [authGuard] }
    ]
  },
  {
    path: 'QUANTRI',
    children: [
      { path: 'quantrithaotacmenu', component: QuantriThaotacmenuComponent, canActivate: [authGuard] },
      { path: 'quantriphanquyenmenu', component: QuantriPhanquyenmenuComponent, canActivate: [authGuard] },
      { path: 'quantrithongtinnguoidung', component: QuantriThongtinnguoidungComponent, canActivate: [authGuard] }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiVTCNTTRoutingModule { }
