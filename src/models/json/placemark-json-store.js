import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { stationJsonStore } from "./station-json-store.js";

const db = new Low(new JSONFile("./src/models/json/placemarks.json"));
db.data = { placemarks: [] };

export const placemarkJsonStore = {
  async getAllPlaylists() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(placemark) {
    await db.read();
    placemark._id = v4();
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarkById(id) {
    await db.read();
    let list = db.data.placemarks.find((placemark) => placemark._id === id);
    if (list) {
      list.stations = await stationJsonStore.getStationsByPlaylistId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPlacemarks(userid) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlacemarkById(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },
};
