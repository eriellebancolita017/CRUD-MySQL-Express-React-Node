const express = require("express");
const cors = require("cors");

const app = express();

/* --------- db sync --------
  In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

  const db = require("./models")
  db.sequelize.sync();
 */

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test for CRUD application." });
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})