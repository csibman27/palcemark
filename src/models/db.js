import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { stationMemStore } from "./mem/station-mem-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  stationStore: null,

  init() {
    this.userStore = userMemStore;
    this.placemarkStore = placemarkMemStore;
    this.stationStore = stationMemStore;
  },
};
