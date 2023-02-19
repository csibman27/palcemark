import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trackSchema = new Schema({
  title: String,
  location: String,
  unleaded_price: Number,
  diesel_price: Number,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Track = Mongoose.model("Track", stationSchema);
