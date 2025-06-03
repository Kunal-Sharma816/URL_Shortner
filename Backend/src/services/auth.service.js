import { createUser, findUserByEmail, findUserByEmailAndPassword} from "../dao/user.dao.js"
import User from "../models/user.model.js"
import { ConflictError } from "../utils/errorHandler.js"
import { signToken } from "../utils/helper.js"

export const registerUserService = async (name, email, password) => {
  const user = await findUserByEmail({ email })
  if (user) throw new ConflictError("User Already exists")

  const newUser = await createUser(name, email, password)
  const token = await signToken({ id: newUser._id })

  return { token, user: newUser }  // ✅ return both token and user
}


export const loginUserService = async (email, password) => {
  const user = await findUserByEmailAndPassword({ email });
  if (!user) throw new Error("Invalid Credentials");

  const isMatch = await user.comparePassword(password); // use the method from schema
  if (!isMatch) throw new Error("Invalid Credentials");

  const token = await signToken({ id: user._id });
  return { token, user };
};


