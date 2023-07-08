const UserAuthModal = require("../modals/UserAuthModel");
const Jwt = require("jsonwebtoken"); // for generating jwt token
const bcrypt = require("bcrypt"); //for decript the values
const secreat_key = "Next@717";
const dotenv = require("dotenv");
const { Auth } = require('two-step-auth');
dotenv.config({ path: "../../src/.env" });
const nodemailer = require("nodemailer")
//getting all user data on Route /User
const handleAuthRequest = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = Jwt.verify(token, secreat_key);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const userdata = async (req, res) => {
  try {
    const userData = await UserAuthModal.find();

    res.status(201).send(userData);
  } catch (error) {
    res.status(400).send("something went Wrong");
  }
};

const SignupUser = async (req, res) => {
  try {
    const { name, email, password, mobile, acctype } = req.body;

    const user = await UserAuthModal.findOne({ email });
    const mobileuser = await UserAuthModal.findOne({ mobile });
    // check if user already exists
    if (user) {
      return res.status(409).json({ message: "Email is Already Exists!" });
    }
    if (mobileuser) {
      return res.status(409).json({ message: " Mobile no Already Exists!" });
    }

    // encrypt password using bcrypt hash
    const encryptedPass = await bcrypt.hash(password, 10);

    // create a new user and save it to the database
    const newUser = new UserAuthModal({
      name,
      password: encryptedPass,
      email,
      mobile,
      acctype,
    });
    await newUser.save();

    res.status(201).send({ massage: "Sign up successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

// sign in fuction for route /User/Signin

const SignInUser = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    // first find the user
    const findUser = await UserAuthModal.findOne({ email });

    // if user not found then throw error "User not Found"
    if (!findUser) {
      return res.status(401).json({ message: "User Not Found" });
    }

    if (password) {
      // Signing in with password
      // if password is invalid send error "invalid password"
      const passwordCheck = await bcrypt.compare(password, findUser.password);
      if (!passwordCheck) {
        return res.status(401).json({ message: "Invalid Password" });
      }
    } else if (otp) {
      // Signing in with OTP
      // Check if the provided OTP matches the user's OTP
      if (otp !== findUser.otp) {
        return res.status(401).json({ message: "Invalid OTP" });
      }
    } else {
      return res.status(400).json({ message: "Password or OTP is required" });
    }

    // Clear the OTP after successful sign-in
    findUser.otp = undefined;
    await findUser.save();

    // user is found and password or OTP is valid, then send token.

    // token for login
    const tokenForLogin = Jwt.sign({ userId: findUser._id }, secreat_key, {
      expiresIn: "1h",
    });

    res.status(200).json(tokenForLogin);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};



const requestOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserAuthModal.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP to the user
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    // Save the generated OTP to the user in the database
    user.otp = otp;
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};


module.exports = {
  SignupUser,
  SignInUser,
  handleAuthRequest,
  userdata,
  requestOTP,
  // verifyOTP,
};
