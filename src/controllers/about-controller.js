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
};
