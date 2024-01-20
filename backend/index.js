const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user");
const bountyRouter = require("./routes/bounty");
const { connectToDb } = require("./connect");
const authenticateToken = require("./auth");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8888;
const user = process.env.MONGO_DB_ADMIN;
const password = process.env.MONGO_DB_PASSWORD;

// Connecting to MongoDB via Mongoose
connectToDb(`mongodb://127.0.0.1:27017/`)
  .then((res) => console.log("Mongo DB Connected"))
  .catch((err) => console.log("MongoDB ERROR: ", err));

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARES - with custom routers
app.use("/user", userRouter); // for user register,login,logout.
app.use("/bounty", authenticateToken, bountyRouter); // for user register,login,logout.
app.listen(PORT, () => console.log(`Server Listening at PORT: ${PORT}`));
