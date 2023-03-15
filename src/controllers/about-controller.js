import { db } from "../models/db.js";

function myFunction() {
  document.getElementById("demo").innerHTML = "Paragraph changed.";
}

export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Placemark",
      };
      return h.view("about-view", viewData);
    },
  },
  gmaps: {
    handler: function initMap() {
      const myLatLng = { lat: 52.2458777, lng: -7.138828 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: myLatLng,
      });
      new google.maps.Marker({
        position: myLatLng,
        map,
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBSH-MEAYrP70lwxXkW0_-bt1jq9uXKtjg&callback=initMap",
        title: "Hello World!",
      });
    },
  },
};
