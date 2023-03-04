import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async createPlacemark(placemark) {
    const res = await axios.post(`${this.playtimeUrl}/api/placemarks`, placemark);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const response = await axios.delete(`${this.playtimeUrl}/api/placemarks`);
    return response.data;
  },

  async deletePlacemark(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/placemarks/${id}`);
    return response;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.playtimeUrl}/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getAllStations() {
    const res = await axios.get(`${this.playtimeUrl}/api/stations`);
    return res.data;
  },

  async createStation(id, station) {
    const res = await axios.post(`${this.playtimeUrl}/api/placemarks/${id}/stations`, station);
    return res.data;
  },

  async deleteAllStations() {
    const res = await axios.delete(`${this.playtimeUrl}/api/stations`);
    return res.data;
  },

  async getStation(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/stations/${id}`);
    return res.data;
  },

  async deleteStation(id) {
    const res = await axios.delete(`${this.playtimeUrl}/api/stations/${id}`);
    return res.data;
  },
};
