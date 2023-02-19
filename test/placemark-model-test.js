import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPlacemarks, localStations } from "./fixtures.js";

suite("Placemark Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.placemarktStore.deleteAllPlacemarks();
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarktStore.addPlacemark(testPlacemarks[i]);
    }
  });

  test("create a placemark", async () => {
    const placemark = await db.placemarktStore.addPlacemark(localStations);
    assert.equal(localStations, placemark);
    assert.isDefined(placemark._id);
  });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await db.placemarktStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 3);
    await db.placemarktStore.deleteAllPlacemarks();
    returnedPlacemarks = await db.placemarktStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const placemark = await db.placemarktStore.addPlacemark(localStations);
    const returnedPlacemark = await db.placemarktStore.getPlacemarkById(placemark._id);
    assert.equal(localStations, placemark);
  });

  test("delete One Placemark - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarktStore.deletePlacemarkById(id);
    const returnedPlacemarks = await db.placemarktStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarktStore.getPlacemarkById(id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarktStore.getPlacemarkById(""));
    assert.isNull(await db.placemarktStore.getPlacemarkById());
  });

  test("delete One Placemark - fail", async () => {
    await db.placemarktStore.deletePlacemarkById("bad-id");
    const allPlacemarks = await db.placemarktStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, allPlacemarks.length);
  });
});
