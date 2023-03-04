import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { stationMemStore } from "./mem/station-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { stationJsonStore } from "./json/station-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { stationMongoStore } from "./mongo/station-mongo-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  stationStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkJsonStore;
        this.stationStore = stationJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.stationStore = stationMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.placemarkStore = placemarkMemStore;
        this.stationStore = stationMemStore;
    }
  },
};
