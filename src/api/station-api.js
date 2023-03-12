import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const stationApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stations = await db.stationStore.getAllStations();
        return stations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const station = await db.stationStore.getStationById(request.params.id);
        if (!station) {
          return Boom.notFound("No station with this id");
        }
        return station;
      } catch (err) {
        return Boom.serverUnavailable("No station with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const station = await db.stationStore.addStation(request.params.id, request.payload);
        if (station) {
          return h.response(station).code(201);
        }
        return Boom.badImplementation("error creating station");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.stationStore.deleteAllStations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const station = await db.stationStore.getStationById(request.params.id);
        if (!station) {
          return Boom.notFound("No Station with this id");
        }
        await db.stationStore.deleteStation(station._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Station with this id");
      }
    },
  },
};