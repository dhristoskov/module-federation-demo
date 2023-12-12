import { Router } from "express";
import { check } from "express-validator";

import addressController from "../controllers/address-controller.js";
import validate from "../middelware/validation.js";

const router = Router();

router.get("/", validate, addressController.getUserAddresses);
router.get("/single-address/:id", validate, addressController.getAddressById);
router.get(
  "/selected/",
  validate,
  addressController.getUserAddressSelectedStatus
);
router.patch(
  "/update/:id",
  validate,
  [
    check("street", "Please provide a street name").not().isEmpty().trim(),
    check("street_number", "Please provide a street number")
      .not()
      .isEmpty()
      .trim(),
    check("city", "Please provide a city name").not().isEmpty().trim(),
    check("postal_code", "Please provide a postal code").not().isEmpty().trim(),
    check("country", "Please provide a country name").not().isEmpty().trim(),
  ],
  addressController.updateAddressById
);
router.post(
  "/add-new",
  validate,
  [
    check("street", "Please provide a street name").not().isEmpty().trim(),
    check("street_number", "Please provide a street number")
      .not()
      .isEmpty()
      .trim(),
    check("city", "Please provide a city name").not().isEmpty().trim(),
    check("postal_code", "Please provide a postal code").not().isEmpty().trim(),
    check("country", "Please provide a country name").not().isEmpty().trim(),
  ],
  addressController.addNewAddress
);

router.delete("/delete/:id", validate, addressController.deleteAddress);
router.patch(
  "/select-status/:id",
  validate,
  addressController.updateAddressSelectedStatus
);

export default router;
