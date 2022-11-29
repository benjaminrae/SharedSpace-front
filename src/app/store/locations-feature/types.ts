export type Locations = LocationStructure[];

export interface LocationStructure {
  name: string;
  location: string;
  owner: string;
  services?: Partial<Services>;
}

interface Services {
  allDayAccess: boolean;
  airConditioning: boolean;
  kitchen: boolean;
  freeTeaCoffee: boolean;
  eventManagement: boolean;
  freeTrial: boolean;
  wifi: boolean;
  meetingRoom: boolean;
  reception: boolean;
  parking: boolean;
  photocopier: boolean;
  printer: boolean;
  projector: boolean;
  scanner: boolean;
  tv: boolean;
  whiteboard: boolean;
}

export interface LocationsState {
  locations: Locations;
}
