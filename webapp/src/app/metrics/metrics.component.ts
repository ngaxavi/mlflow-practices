import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../app.service";
import {forkJoin} from "rxjs";
import {take, tap} from "rxjs/operators";
import {Chart} from "angular-highcharts";
import {UpperCasePipe} from "@angular/common";
import {SeriesOptionsType} from "highcharts";
import {Metric, MetricValue} from "../app.interface";

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  metrics: MetricValue[] = [];
  charts = [];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly appService: AppService) {
  }

  ngOnInit(): void {
    const metricKeyString = this.route.snapshot.queryParamMap.get('key');
    const runId = this.route.snapshot.paramMap.get('runId');
    const metricKeys = metricKeyString.split(',');

    const requests = metricKeys.map((metricKey: string) => this.appService.getMetricsForRun(runId, metricKey)
      .pipe(
        tap((res: {metrics: Metric[]}) => this.metrics.push({
          key: metricKey,
          values: res.metrics.map(d => ({timestamp: +d.timestamp, value: +d.value}))
        }))));

    forkJoin(requests).pipe(take(1)).subscribe((data) => {
      const metricsWithMoreThanOneValue = this.metrics.filter(m => m.values.length >= 2);

      for (const metric of metricsWithMoreThanOneValue) {
        const values = metric.values.map(v => ([v.timestamp, v.value]));

        const chart = new Chart({
          chart: {type: 'line', zoomType: 'x'},
          title: {
            text: new UpperCasePipe().transform(metric.key),
          },
          xAxis: {
            type: 'datetime'
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: metric.key,
              data: values
            } as SeriesOptionsType
          ]
        });
        this.charts.push(chart);
      }
    });
  }

}
