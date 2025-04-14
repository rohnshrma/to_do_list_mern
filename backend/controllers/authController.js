import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    res.status(500).json({
      message: "Server Error! Could Not Create User.",
    });
  }
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("login credential =>", email, password);
//   try {
//     const user = await User.findOne({ email });
//     console.log("existing user => ", user);
//     if (!user) {
//       return res.status(400).json({ message: "Invalid Credentials!" });
//     }
//     console.log("user password", password);
//     console.log("saved password", user.password);
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("credential match => ", isMatch);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Credentials!" });
//     }

//     const token = generateToken(user._id);
//     console.log("Login Token => ", token);
//     res.status(200).json({ token, user: { id: user._id, name, email } });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error! Could Not Log You In" });
//   }
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error! Could Not Log You In" });
  }
};
