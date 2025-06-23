import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userService";
import { json, Request, Response, RequestHandler } from "express";
import { IUserRepository, IUserService, User } from "types/UsersTypes";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser: RequestHandler = async (req, res) => {
  const { email }: User = req.body;
  const userExists = await userService.findUsersByEmail(email);
  if (userExists) {
    res.status(400).json({ message: "Email already exists!!!" });
    return;
  }
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

export const loginUser: RequestHandler = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  const { email, password }: User = req.body;

  if (!password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  const user = await userService.findUsersByEmail(email);
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  if (!user.password) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }
  const token = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "30d",
  });
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};
