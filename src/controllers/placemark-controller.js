import { StationSpec } from "../models/joi-schemas.js";
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
    validate: {
      payload: StationSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentPlacemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        return h.view("placemark-view", { title: "Add station error", placemark: currentPlacemark, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newStation = {
        title: request.payload.title,
        description: request.payload.description,
        unleaded_price: Number(request.payload.unleaded_price),
        diesel_price: Number(request.payload.diesel_price),
      };
      await db.stationStore.addStation(placemark._id, newStation);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  deleteStation: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.stationStore.deleteStation(request.stationid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
