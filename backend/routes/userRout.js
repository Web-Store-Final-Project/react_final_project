const express = require("express");
const {
  setOnlineStatus,
  setContactRequest,
  getAllActiveUsers,
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/userController");
const app = express();
const router = express.Router();

//GET all users
router.get("/", getAllUsers);

//GET a single user by email
router.get("/:email", getUser);

//POST a new user
router.post("/", createUser);

//UPDATE the new status
router.post("/setOnlineStatus", setOnlineStatus);

//GET all active users
router.get("/activeUsers", getAllActiveUsers);
module.exports = router;
