// const pgPromise = require('pg-promise');
// const pgp = pgPromise(/*options*/);
// const db = pgp(process.env.DATABASE_URL);
const express = require("express");
const cors = require("cors");
// require('dotenv').config()

const app = express();
const port = "3001";
app.use(cors()); // Active CORS

app.get("/api", (req, res) => {
  const responseData = { 
    hello: "Hello from server!",
    checkData: "Here, the data you want!"
  };
  res.json(responseData);
});


app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});


// db.one("SELECT $1 AS value", 123)
//   .then((data) => {
//     console.log("DATA:", data.value);
//   })
//   .catch((error) => {
//     console.log("ERROR:", error);
//   });
