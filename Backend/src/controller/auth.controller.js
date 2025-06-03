import { cookieOptions } from "../config/config.js"
import { registerUserService, loginUserService } from "../services/auth.service.js"
import { wrapAsync } from "../utils/errorHandler.js"

export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body
  const { token, user } = await registerUserService(name, email, password) // ✅ destructure both

  req.user = user
  res.cookie("accessToken", token, cookieOptions)
  res.status(200).json({ message: "Register Success" })
})

export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await loginUserService(email, password);

  req.user = user;
  console.log(user)
  console.log("Token", token)
  res.cookie("accessToken", token, cookieOptions);

  res.status(200).json({
    user: user,
    message: "Login successful",
    token,
  });
});


export const logoutUser = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ message: "logout success" });x
});



export const getCurrentUser = wrapAsync(async(req , res)=>
{
  res.status(200).json({user:req.user});
})


