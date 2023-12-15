import express from "express";
import ConnectDB from "./ConnectDB.js";
import bodyParser from "body-parser";

import userRoutes from "./routes/user-routes.js";
import addressRoutes from "./routes/address-routes.js";
import basketRoutes from "./routes/basket-routes.js";
import orderRoutes from "./routes/order-routes.js";

const app = express();
await ConnectDB();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/user", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/basket", basketRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server started at port ${PORT}`);
});
