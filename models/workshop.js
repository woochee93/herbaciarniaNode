var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: { type: String, required: [true, "To pole jest wymagane"] },
  description: { type: String, required: [true, "To pole jest wymagane"] },
  created: {
    type: Date,
    default: Date.now,
  },
  start: { type: Date },
  end: { type: Date },
});

module.exports = mongoose.model("workshop", newsSchema);
