import { Router } from "express";
import { check } from "express-validator";

import validate from "../middelware/validation.js";
import usersController from "../controllers/user-controller.js";

const router = Router();

router.post(
  "/register",
  [
    check("first_name", "Please provide a first name")
      .not()
      .isEmpty()
      .isLength({ min: 2 })
      .trim(),
    check("last_name", "Please provide a last name")
      .not()
      .isEmpty()
      .isLength({ min: 2 })
      .trim(),
    check("username", "Please provide an username")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .trim(),
    check("password", "Password at least 6 character long")
      .isLength({ min: 6 })
      .trim(),
  ],
  usersController.registerUser
);
router.post(
  "/login",
  [
    check("username", "Please provide an username")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .trim(),
    check("password", "Password at least 6 character long")
      .isLength({ min: 6 })
      .trim(),
  ],
  usersController.loginUser
);
router.patch(
  "/email",
  validate,
  [
    check("email", "Please provide a valid email address")
      .isEmail()
      .normalizeEmail(),
  ],
  usersController.addOrUpdateEmailAddress
);
router.patch(
  "/phone-number",
  validate,
  [
    check("phone_number", "Please provide a valid phone number")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .trim(),
  ],
  usersController.addOrUpdatePhoneNumber
);
router.patch(
  "/change-password",
  validate,
  [
    check("actual_password", "Please provide your actual password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .trim(),
    check("new_password", "New password at least 6 character long")
      .isLength({ min: 6 })
      .trim(),
    check("confirm_password", "Confirm password at least 6 character long")
      .isLength({ min: 6 })
      .trim(),
  ],
  usersController.changeAccountPassword
);
router.get("/info", validate, usersController.getUserInformation);
router.delete(
  "/delete-user",
  [
    check("password", "Password at least 6 character long")
      .isLength({ min: 6 })
      .trim(),
  ],
  validate,
  usersController.deleteUserAccount
);

export default router;
