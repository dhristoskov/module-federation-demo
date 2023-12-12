import { Router } from "express";

import basketController from "../controllers/basket-controller.js";
import validate from "../middelware/validation.js";

const router = Router();

router.post("/add-product", validate, basketController.addProductToBasket);
router.get("/get-basket", validate, basketController.getBasketProducts);
router.patch("/change-quantity", validate, basketController.changeQuantity);
router.delete("/remove-product/:id", validate, basketController.deleteProductFromBasket);
router.delete("/clear-basket", validate, basketController.removeAllProducts);

export default router;
