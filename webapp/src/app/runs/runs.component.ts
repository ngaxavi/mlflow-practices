import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../app.service";
import {take} from "rxjs/operators";
import {Run} from "../app.interface";

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  runs: Run[];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly appService: AppService) { }

  ngOnInit(): void {
    const experimentId = this.route.snapshot.paramMap.get('id');
    this.getAllRunsFor(experimentId);
  }

  getAllRunsFor(experimentId: string) {
    this.appService.getAllRunsByExperiment(experimentId).pipe(take(1)).subscribe((data: any) => {
      this.runs = data.runs;
    });
  }

  viewMetrics(runId: string, metrics: any[]) {
    const metricKeys = metrics.map(m => m.key);
    this.router.navigate(['runs', runId], {queryParams: { key: metricKeys.join(',') }, relativeTo: this.route});
  }

}
