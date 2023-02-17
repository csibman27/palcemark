import { v4 } from "uuid";

let stations = [];

export const stationMemStore = {
  async getAllStations() {
    return stations;
  },

  async addStation(placemarkId, station) {
    station._id = v4();
    station.placemarkid = placemarkId;
    stations.push(station);
    return station;
  },

  async getStationsByPlacemarkId(id) {
    return stations.filter((station) => station.placemarkid === id);
  },

  async getStationkById(id) {
    return stations.find((station) => station._id === id);
  },

  async getPlacemarkStations(placemarkId) {
    return stations.filter((station) => station.placemarkid === placemarkId);
  },

  async deleteStation(id) {
    const index = stations.findIndex((station) => station._id === id);
    stations.splice(index, 1);
  },

  async deleteAllStations() {
    stations = [];
  },

  async updateStation(station, updatedStation) {
    station.name = updatedStation.name;
    station.location = updatedStation.location;
    station.unleaded_price = updatedStation.unleaded_price;
    station.diesel_price = updatedStation.diesel_price;
  },
};
