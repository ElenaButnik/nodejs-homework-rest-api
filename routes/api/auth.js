const express = require("express");

const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");

const { user, upload } = require("../../middlewares");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signUp));

router.patch("/:contactId/subscription", user, ctrlWrapper(ctrl.subscription));

router.post("/login", ctrlWrapper(ctrl.logIn));

router.get("/current", user, ctrlWrapper(ctrl.current));

router.get("/logout", user, ctrlWrapper(ctrl.logOut));

router.patch(
  "/avatars",
  user,
  upload.single("avatar"),
  ctrlWrapper(ctrl.avatars)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post("/verify", ctrlWrapper(ctrl.verifyPost));

module.exports = router;
