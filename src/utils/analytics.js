import { db } from "../models/db.js";

export const analytics = {
  async getMinUnleadedPrice() {
    const stations = await db.stationStore.getAllStations();
    console.log(stations);
    if (stations.length > 0) {
      let minPrice = stations.unleaded_price[1];
      for (let i = 0; i < stations.length; i++) {
        if (stations.unleaded_price[i] <= minPrice) {
          minPrice = stations.unleaded_price[i].unleaded_price;
        }
      }
      return minPrice;
    }
  },
  async getMaxUnleadedPrice() {
    const stations = await db.stationStore.getAllStations();
    console.log(stations);
    if (stations.length > 0) {
      let maxPrice = stations.unleaded_price[0].unleaded_price;
      for (let i = 0; i < stations.title.length; i++) {
        if (stations.unleaded_price[i].unleaded_price >= minPrice) {
          maxPrice = stations.unleaded_price[i].unleaded_price;
        }
      }
      return maxPrice;
    }
  },
};
