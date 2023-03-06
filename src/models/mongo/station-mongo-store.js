import { Station } from "./station.js";
import { Placemark } from "./placemark.js";

export const stationMongoStore = {
  async getAllStations() {
    const stations = await Station.find().lean();
    return stations;
  },

  async addStation(placemarkId, station) {
    station.placemarkid = placemarkId;
    const newStation = new Station(station);
    const stationObj = await newStation.save();
    return this.getStationById(stationObj._id);
  },

  async getStationsByPlacemarkId(id) {
    const stations = await Station.find({ placemarkid: id }).lean();
    return stations;
  },

  async getStationById(id) {
    if (id) {
      const station = await Station.findOne({ _id: id }).lean();
      return station;
    }
    return null;
  },

  async deleteStation(id) {
    try {
      await Station.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllStations() {
    await Station.deleteMany({});
  },

  async updateStation(station, updatedStation) {
    station.title = updatedStation.title;
    station.description = updatedStation.description;
    station.unleaded_price = updatedStation.unleaded_price;
    station.diesel_price = updatedStation.diesel_price;
    await station.save();
  },
};
