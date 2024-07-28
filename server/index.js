// 4 steps procedure to make server

// Express ko bulna hoga is file me
const express = require("express");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { connectDb } = require("./connection");
const cors = require("cors");
// import the route here
// const authRoute = require("./routes/authRoutes");

// binding this env
dotenv.config();
// Express ko call karna padega ek variable me
const app = express();
// port define karna hoga - Port hota hai darwaja
const port = process.env.PORT || 5000;

connectDb();
// Making routes
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<center><h1>Server Running Dudes...</h1></center>");
});

// How to use routes
// app.use("/api", authRoute);

// importing and using routes dyanmically
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);
// console.log(readdirSync("./routes"))

// types of requests
// 1. GET -> To get the data from the server
// 2. POST -> To post the data to the server
// 3. PUT -> To update the data on the server
// 4. DELETE -> To dete the data form the server

// Server ko listen karna hoga
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
