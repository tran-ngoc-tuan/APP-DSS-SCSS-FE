import { CommonModule } from "@angular/common";
import { UiBasicRoutingModule } from "./ui-basic-routing.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [],
    imports: [CommonModule,UiBasicRoutingModule],
    exports: [RouterModule]
  })
  export class UiBasicModule {}
  