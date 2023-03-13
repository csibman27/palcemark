import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { playtimeService } from "./playtime-service.js";
import { maggie, Bulls, maggieCredentials, testPlacemarks, testStations, wideStations } from "../fixtures.js";

suite("Station API tests", () => {
  let user = null;
  let Killarney = null;

  setup(async () => {
    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    await playtimeService.deleteAllPlacemarks();
    await playtimeService.deleteAllStations();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    Bulls.userid = user._id;
    Killarney = await playtimeService.createPlacemark(Bulls);
  });

  teardown(async () => {});

  test("create station", async () => {
    const returnedStation = await playtimeService.createStation(Killarney._id, wideStations);
    assertSubset(wideStations, returnedStation);
  });

  test("create Multiple stations", async () => {
    for (let i = 0; i < testStations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createStation(Killarney._id, testStations[i]);
    }
    const returnedStations = await playtimeService.getAllStations();
    assert.equal(returnedStations.length, testStations.length);
    for (let i = 0; i < returnedStations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const station = await playtimeService.getStation(returnedStations[i]._id);
      assertSubset(station, returnedStations[i]);
    }
  });

  test("Delete StationApi", async () => {
    for (let i = 0; i < testStations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createStation(Killarney._id, testStations[i]);
    }
    let returnedStations = await playtimeService.getAllStations();
    assert.equal(returnedStations.length, testStations.length);
    for (let i = 0; i < returnedStations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const station = await playtimeService.deleteStation(returnedStations[i]._id);
    }
    returnedStations = await playtimeService.getAllStations();
    assert.equal(returnedStations.length, 0);
  });

  test("denormalised placemark", async () => {
    for (let i = 0; i < testStations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createStation(Killarney._id, testStations[i]);
    }
    const returnedPlacemark = await playtimeService.getPlacemark(Killarney._id);
    assert.equal(returnedPlacemark.stations.length, testStations.length);
    for (let i = 0; i < testStations.length; i += 1) {
      assertSubset(testStations[i], returnedPlacemark.stations[i]);
    }
  });
});
