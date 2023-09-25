export interface IStore {
  readonly _id?: string;
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly location: IStoreLocation;
  readonly contact: IStoreContact;
  readonly alias: string;
  readonly quidCashGiftConfig: IQuidCashGiftConfig;
}

export interface IStoreLocation {
  readonly address: IStoreAddress;
  readonly coordinates: IStoreCoordinates;
}

export interface IStoreAddress {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface IStoreCoordinates {
  readonly latitude: string;
  readonly longitude: string;
}

export interface IStoreContact {
  readonly email: string;
  readonly phone: string;
}

export interface IQuidCashGiftConfig {
  readonly grantedPercentagePerSale: number;
  readonly quidCashGiftPercentage: number;
}
