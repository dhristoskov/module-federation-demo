import { Router } from "express";
import { check } from "express-validator";

import validate from "../middelware/validation.js";
import orderController from "../controllers/order-controller.js";

const router = Router();

router.get("/", validate, orderController.getOrders);
router.post(
  "/",
  [
    check("totalPrice", "Please provide a total price")
      .not()
      .isEmpty()
      .isNumeric(),
    check("status", "Please provide a valid status")
      .optional()
      .isIn(["pending", "completed", "cancelled"]),
  ],
  validate,
  orderController.addOrder
);
router.get("/:id", validate, orderController.getOrderByID);

export default router;
