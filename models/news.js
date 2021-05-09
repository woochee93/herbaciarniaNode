var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var formatter = new Intl.DateTimeFormat("pl");
var newsSchema = new Schema({
  title: { type: String, required: [true, "To pole jest wymagane"] },
  created: {
    type: Date,
    default: Date.now,
  },
  description: { type: String, required: [true, "To pole jest wymagane"] },
  image: {
    type: String,
  },
  facebook: { type: String },
});

module.exports = mongoose.model("News", newsSchema);
