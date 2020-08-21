import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppService} from "./app.service";
import {HttpClientModule} from "@angular/common/http";
import { RunsComponent } from './runs/runs.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { MetricsComponent } from './metrics/metrics.component';
import {ChartModule} from "angular-highcharts";

@NgModule({
  declarations: [
    AppComponent,
    RunsComponent,
    ExperimentsComponent,
    MetricsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule

  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
