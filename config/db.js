const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB is connected to PROGLIX"))
  .catch((e) => console.log("Not connected", e));
