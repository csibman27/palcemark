import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },

  addStation: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newStation = {
        station: request.payload.title,
        location: request.payload.artist,
        unleaded_price: Number(request.payload.duration),
        diesel_price: Number(request.payload.duration),
      };
      await db.stationStore.addStation(placemark._id, newStation);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
