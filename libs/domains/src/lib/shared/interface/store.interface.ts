export interface IStore {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly location: IStoreLocation;
  readonly contact: IStoreContact;
  readonly alias: string;
}

export interface IStoreLocation {
  readonly address: IStoreAddress;
  readonly coordinates: IStoreCoordinates;
}

export interface IStoreAddress {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly postal_code: string;
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
  readonly granted_percentage_per_sale: number;
}
