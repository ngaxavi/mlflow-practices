export interface Experiment {
  experiment_id: string;
  name: string;
  lifecycle_stage: string;
  artifact_location: string;
}

export interface Run {
  info: {
    run_id: string;
    experiment_id: string;
    user_id: string;
    status: string;
    start_time: string;
    end_time: string;
    lifecycle_stage?: string;
    artifact_uri?: string;
  },
  data: {
    params: KeyValue[];
    metrics: KeyValue[];
    tags: KeyValue[]
  }
}

export interface Metric {
  key: string;
  value: number;
  timestamp: string;
  step: string;
}

export interface MetricValue {
  key: string;
  values: {
    timestamp: number;
    value: number;
  }[]
}

interface KeyValue {
  key: string;
  value: string;
}
