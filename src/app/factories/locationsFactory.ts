import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { LocationStructure } from "../store/locations-feature/types";

const locationFactory = Factory.define<LocationStructure>(() => ({
  name: faker.company.name(),
  location: faker.address.cityName(),
  owner: faker.database.mongodbObjectId(),
  description: faker.random.words(20),
  id: faker.database.mongodbObjectId(),
  images: {
    image: faker.image.business(),
    small: faker.image.business(),
    backup: faker.image.business(),
    backupSmall: faker.image.business(),
  },
  services: {
    airConditioning: faker.datatype.boolean(),
    allDayAccess: faker.datatype.boolean(),
    eventManagement: faker.datatype.boolean(),
    freeTeaCoffee: faker.datatype.boolean(),
    freeTrial: faker.datatype.boolean(),
    kitchen: faker.datatype.boolean(),
    meetingRoom: faker.datatype.boolean(),
    parking: faker.datatype.boolean(),
    photocopier: faker.datatype.boolean(),
    printer: faker.datatype.boolean(),
    projector: faker.datatype.boolean(),
    reception: faker.datatype.boolean(),
    scanner: faker.datatype.boolean(),
    tv: faker.datatype.boolean(),
    whiteboard: faker.datatype.boolean(),
    wifi: faker.datatype.boolean(),
  },
}));

export const getRandomLocation = () => locationFactory.build();

export const getRandomLocations = (number: number) =>
  locationFactory.buildList(number);
