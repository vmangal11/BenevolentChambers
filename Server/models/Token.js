const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Token expires after 1 hour (3600 seconds)
  },
});

module.exports = mongoose.model("Token", TokenSchema);
