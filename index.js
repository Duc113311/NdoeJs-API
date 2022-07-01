const express = require("express");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const usersRouters = require("../NdoeJs-API/src/routes/users.js");
 const loginRouters = require("../NdoeJs-API/src/routes/login.js");


const app = express();
const PORT = process.env.PORT || 5000; // port để sử dụng
// const isProduction = process.env.NODE_ENV === "production";

app.use(helmet());

app.use(morgan("tiny"));
app.use(cors());

app.use(bodyParser.json());

// Router của Controller User
app.use("/users", usersRouters);
app.use("/login", loginRouters);


// Router Default
app.get("/", (req, res) => res.send("Hello from Homepage"));

// Đang Listen trên port nào.
app.listen(PORT, () =>
  console.log(`Server runing mon port: http://localhost:${PORT}`)
);
