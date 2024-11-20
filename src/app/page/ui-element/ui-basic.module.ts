import { CommonModule } from "@angular/common";
import { UiBasicRoutingModule } from "./ui-basic-routing.module";
import { NgModule } from "@angular/core";
import { BadgeComponent } from "./badge/badge.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { ButtonComponent } from "./button/button.component";
import { CollapseComponent } from "./collapse/collapse.component";
import { TabsPillsComponent } from "./tabs-pills/tabs-pills.component";
import { TypographyComponent } from "./typography/typography.component";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [],
    imports: [CommonModule, UiBasicRoutingModule,BadgeComponent,BreadcrumbComponent,ButtonComponent,CollapseComponent, TabsPillsComponent,TypographyComponent],
    exports: [RouterModule]
  })
  export class UiBasicModule {}
  