import { db } from "../models/db.js";

export const userController = {
  index: {
    handler: async function (request, h) {
      const user = await db.userStore.getAllUsers();
      const viewData = {
        title: "Users Placemark",
        user: user,
      };
      return h.view("user-view", viewData);
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/dashboard");
    },
  },
};
