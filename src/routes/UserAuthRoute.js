const express = require("express");
const UserAuthModal = require("../modals/UserAuthModel")
const router = express.Router();

const { SignInUser, SignupUser, handleAuthRequest,userdata,verifyOTP } = require("../controllers/UserAuth");

router.route("/UserDetail").get(userdata);

router.get("/auth", handleAuthRequest, async (req, res) => {
  try {
    // Access the decoded user data from the request object
    const user = req.user;

    // Fetch additional user data from the database (example using Mongoose)
    const userData = await UserAuthModal.findById(user.userId).select("-password");

    // If user data is found, send it to the client
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});



router.route("/Signup").post(SignupUser);
// router.route("/Signup/verify").post(verifyOTP);

router.route("/Signin").post(SignInUser);

module.exports = router;
