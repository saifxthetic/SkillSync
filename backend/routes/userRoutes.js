const express = require("express");

const {
    createUser,
    loginUser,
    getCurrentUser,
    clientTest,
     freelancerTest,
     updateProfile,
     getUserById
} = require("../controllers/userController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.put("/me", protect, updateProfile);

router.get(
    "/freelancer-test",
    protect,
    authorizeRoles("freelancer"),
     freelancerTest
);

router.get(
    "/client-test",
    protect,
    authorizeRoles("client"),
    clientTest
);

router.get("/:id", getUserById);

module.exports = router;