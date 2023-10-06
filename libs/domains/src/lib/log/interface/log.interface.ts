export interface ILog {
  readonly id: string;
  readonly entityId: string;
  readonly activity: string;
  readonly metadata: ILogMetadata;
  readonly agent: ILogAgent;
}

export interface ILogMetadata {
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
