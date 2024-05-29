import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    //res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

// auth.controller.js


// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Find user by email
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate OTP
//     const otp = generateOTP();

//     // Update user in the database with OTP
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         resetPasswordToken: otp,
//         resetPasswordExpires: Date.now() + 600000, // OTP expires in 10 minutes
//       },
//     });

//     // Send the OTP to the user's email
//     await sendEmail(user.email, "Password Reset OTP", `Your OTP for password reset is: ${otp}`);

//     res.status(200).json({ message: "OTP sent to your email" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     // Find user by email
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user || user.resetPasswordToken !== otp || user.resetPasswordExpires < Date.now()) {
//       return res.status(400).json({ message: "Invalid OTP or OTP expired" });
//     }

//     // Reset the password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         password: hashedPassword,
//         resetPasswordToken: null,
//         resetPasswordExpires: null,
//       },
//     });

//     res.status(200).json({ message: "Password reset successful" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to reset password" });
//   }
// };
