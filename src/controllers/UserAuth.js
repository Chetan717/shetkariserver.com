const UserAuthModal = require("../modals/UserAuthModel");
const Jwt = require("jsonwebtoken"); // for generating jwt token
const bcrypt = require("bcrypt"); //for decript the values
const secreat_key = "Next@717";
const dotenv = require("dotenv");
dotenv.config({ path: "../../src/.env" });

// const speakeasy = require("speakeasy"); // for generating OTP

// const twilio = require("twilio");

// const SignupUser = async (req, res) => {
//   try {
//     const { name, email, password, mobile, acctype } = req.body;

//     const user = await UserAuthModal.findOne({ email });
//     if (user) {
//       return res.status(409).json({ message: "Email is already registered" });
//     }

//     const generateAndSendOTP = async (mobile) => {
//       try {
//         const otpSecret = speakeasy.generateSecret({
//           length: 4,
//           symbols: false,
//           alphanumeric: false,
//         }).base32;

//         const otp = speakeasy.totp({
//           secret: toString(otpSecret), // generate and store a secret key
//           encoding: "base32",
//           step: 300, // OTP validity duration (in seconds)
//         });

//         // Send the OTP via SMS using Twilio
//         const twilioClient = twilio(
//           process.env.TWILIO_ACCOUNT_SID,
//           process.env.TWILIO_AUTH_TOKEN
//         );
//         await twilioClient.messages.create({
//           body: `Your OTP is: ${otp}`,
//           from: '+917387427755',
//           to: Number(7387427755),
//         });

//         return otp;
//       } catch (error) {
//         console.log(error);
//         throw new Error("Failed to send OTP");

//       }
//     };

//     const otp = await generateAndSendOTP(mobile);

//     const encryptedPass = await bcrypt.hash(password, 10);

//     const newUser = new UserAuthModal({
//       name,
//       password: encryptedPass,
//       email,
//       mobile,
//       otp,
//       acctype,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "Sign up successfully", otp });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await UserAuthModal.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.otp !== otp) {
//       return res.status(401).json({ message: "Invalid OTP" });
//     }

//     // Clear the OTP after successful verification
//     user.otp = undefined;

//     await user.save();

//     // Continue with the sign-in process (generate token, etc.)
//     // ...

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

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
    const { email, password } = req.body;

    // first find the user
    const findUser = await UserAuthModal.findOne({ email });

    // if user not found then throw error "User not Found"
    if (!findUser) {
      res.status(401).json({ massage: "User Not Found" });
    }

    // if user found check the password and compare
    const PasswordCheck = await bcrypt.compare(password, findUser.password);

    // if password is invalid send error " invalid password"
    if (!PasswordCheck) {
      return res.status(401).json({ massage: "invalid Password" });
    }
    // user is exit and password is match then send token.

    // token for login
    const TokenForLogin = Jwt.sign({ userId: findUser._id }, secreat_key, {
      expiresIn: "1h",
    });

    res.status(200).json(TokenForLogin);
  } catch (error) {
    res.status(500).json({ massage: "Something went wrong !" });
  }
};

module.exports = {
  SignupUser,
  SignInUser,
  handleAuthRequest,
  userdata,
  // verifyOTP,
};
