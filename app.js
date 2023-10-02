if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routers");
const err_handler = require("./middlewares/error_handler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(err_handler);

app.listen(PORT, () =>
  console.log(`successfully connected to port http://localhost:${PORT} 🚀`)
);