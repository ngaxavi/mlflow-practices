import { Component, OnInit } from '@angular/core';
import {take} from "rxjs/operators";
import {AppService} from "../app.service";
import {Experiment} from "../app.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit {

  public experiments: Experiment[];

  constructor(private readonly appService: AppService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit(): void {
    this.getExperiments();
  }

  getExperiments() {
    this.appService.getAllExperiments().pipe(take(1)).subscribe((data: any) => {
      this.experiments = data.experiments;
    });
  }

  viewAllRuns(experimentId: string) {
    this.router.navigate(['experiments', experimentId], { relativeTo: this.route });
  }
}
