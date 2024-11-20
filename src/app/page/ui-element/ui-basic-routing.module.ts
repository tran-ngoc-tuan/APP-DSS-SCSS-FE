import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { BadgeComponent } from "./badge/badge.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { ButtonComponent } from "./button/button.component";
import { CollapseComponent } from "./collapse/collapse.component";
import { TabsPillsComponent } from "./tabs-pills/tabs-pills.component";
import { TypographyComponent } from "./typography/typography.component";
 const routes: Routes = [
    {
      path: '',
      children: [
        { path: 'badges', component: BadgeComponent },
        { path: 'breadcrumb-paging', component: BreadcrumbComponent },
        { path: 'button', component: ButtonComponent },
        { path: 'collapse', component: CollapseComponent },
        { path: 'tabs-pills', component: TabsPillsComponent },
        { path: 'typography', component: TypographyComponent },
    ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UiBasicRoutingModule {}
  