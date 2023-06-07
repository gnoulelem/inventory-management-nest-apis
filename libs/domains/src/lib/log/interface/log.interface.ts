export interface ILog {
  readonly id: string;
  readonly entityId: string;
  readonly activity: string;
  readonly metadata: ILogMetada;
  readonly agent: ILogAgent;
}

export interface ILogMetada {
  readonly time: number;
}

export interface ILogAgent {
  readonly ipAddress: string;
  readonly osType: string;
  readonly osVersion: string;
  readonly timeZone: string;
  readonly browser: string;
  readonly language: string;
  readonly location: string;
}
