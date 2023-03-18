import { db } from "../models/db.js";
import { analytics } from "../utils/analytics.js";

export const analyticsController = {
  index: {
    handler: async function (request, h) {
      const station = await db.stationStore.getAllStations();

      const stations = await db.stationStore.getAllStations();
      const minUnleadedPrice = await analytics.getMinUnleadedPrice();

      const viewData = {
        title: station.title,
        station: station,
        minUnleadedPrice,
      };
      return h.view("analytics-view", viewData);
    },
  },
};
