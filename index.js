import express from "express";
import bodyParser from "body-parser";

import usersRouters from '../NodeJs/src/routes/users.js';
const app = express();
const PORT = 5000; // port để sử dụng

app.use(bodyParser.json());

// Router của Controller User
app.use("/users", usersRouters);

// Router Default
app.get("/", (req, res) => res.send("Hello from Homepage"));

// Đang Listen trên port nào.
app.listen(PORT, () =>
  console.log(`Server runing mon port: http://localhost:${PORT}`)
);
