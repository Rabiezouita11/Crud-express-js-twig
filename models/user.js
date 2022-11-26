const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: String,
    password: {type:String, default: "examen123"},
    email: String
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
