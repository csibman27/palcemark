import { EventEmitter } from "events";
import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, Amarando, testPlacemarks } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Placemark API tests", () => {
  let user = null;

  setup(async () => {
    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    await playtimeService.deleteAllPlacemarks();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    Amarando.userid = user._id;
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await playtimeService.createPlacemark(Amarando);
    assert.isNotNull(returnedPlacemark);
    assertSubset(Amarando, returnedPlacemark);
  });

  test("delete a placemark", async () => {
    const placemark = await playtimeService.createPlacemark(Amarando);
    const response = await playtimeService.deletePlacemark(placemark._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlacemark = await playtimeService.getPlacemark(placemark.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });

  test("create multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      testPlacemarks[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlacemark(testPlacemarks[i]);
    }
    let returnedLists = await playtimeService.getAllPlacemarks();
    assert.equal(returnedLists.length, testPlacemarks.length);
    await playtimeService.deleteAllPlacemarks();
    returnedLists = await playtimeService.getAllPlacemarks();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant placemark", async () => {
    try {
      const response = await playtimeService.deletePlacemark("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });
});
