import Mongoose from "mongoose";

const { Schema } = Mongoose;

const stationSchema = new Schema({
  title: String,
  location: String,
  unleaded_price: Number,
  diesel_price: Number,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Station = Mongoose.model("Track", stationSchema);
