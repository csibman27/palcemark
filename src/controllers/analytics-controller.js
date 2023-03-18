import { db } from "../models/db.js";
import { analytics } from "../utils/analytics.js";

export const analyticsController = {
  index: {
    handler: async function (request, h) {
      const station = await db.stationStore.getAllStations();

      const totalPlacemarks = await analytics.getTotalPlacemarks();
      const totalStations = await analytics.getTotalStations();
      const totalUsers = await analytics.getTotalUsers();
      const minPetrolPrice = await analytics.getCheapestPetrolPrice();
      const minDieselPrice = await analytics.getCheapestDieselPrice();

      const viewData = {
        title: station.title,
        station: station,
        totalPlacemarks,
        totalStations,
        totalUsers,
        minPetrolPrice,
        minDieselPrice,
      };
      return h.view("analytics-view", viewData);
    },
  },
};
