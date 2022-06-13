if (process.env["NODE_ENV"] !== "production") require("dotenv").config(); //?Environment variables config
const fs = require("fs");

if (!fs.existsSync("./uploads")) {
  // if not create directory
  fs.mkdirSync("./uploads");
}

require("./database");

const app = require("./app");

const server = app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});

module.exports = { app, server };
