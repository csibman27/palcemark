import { db } from "../models/db.js";

export const analyticsController = {
  index: {
    handler: async function (request, h) {
      const station = await db.stationStore.getAllStations();
      const viewData = {
        title: station.title,
        station: station,
      };
      return h.view("analytics-view", viewData);
    },
  },
};
