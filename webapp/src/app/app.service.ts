import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Metric, Run} from "./app.interface";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  mlflowUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.mlflowUrl = '/api/2.0/mlflow';
  }

  getAllExperiments() {
    return this.httpClient.get(`${this.mlflowUrl}/experiments/list`);
  }

  getAllRunsByExperiment(experimentId: string): Observable<{ runs: Run[] }> {
    return this.httpClient.post<{ runs: Run[] }>(`${this.mlflowUrl}/runs/search`, {
      experiment_ids: [experimentId],
      filter: '',
      max_result: 100,
      order_by: [],
      run_view_type: 'ALL'
    });
  }

  getMetricsForRun(runId: string, metricKey: string): Observable<{ metrics: Metric[] }> {
    return this.httpClient.get<{ metrics: Metric[] }>(`${this.mlflowUrl}/metrics/get-history`, {
      params: {
        run_id: runId,
        metric_key: metricKey
      }
    });
  }

}
