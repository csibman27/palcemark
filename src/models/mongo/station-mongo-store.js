import { Station } from "./station.js";

export const stationMongoStore = {
  async getStationsByPlacemarkId(id) {
    const stations = await Station.find({ placemarkid: id }).lean();
    return stations;
  },
};
