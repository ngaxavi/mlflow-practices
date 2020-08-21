import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentsComponent} from "./experiments/experiments.component";
import {RunsComponent} from "./runs/runs.component";
import {MetricsComponent} from "./metrics/metrics.component";

const routes: Routes = [
  {
    path: '',
    component: ExperimentsComponent
  },
  {
    path: 'experiments/:id',
    component: RunsComponent
  },
  {
    path: 'experiments/:id/runs/:runId',
    component: MetricsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
