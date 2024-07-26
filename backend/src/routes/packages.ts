import express, { Request, Response } from "express";
import fetchUser from "../middleware/fetchUser";
import {
  getAllPackages,
  subscribeToPackage,
  getUserSubscribedPackages,
} from "../controllers/packageController";

const packagesRouter = express.Router();

// route to get all packages
packagesRouter.get("/", fetchUser, getAllPackages);

// route to subscribe to a package
packagesRouter.patch("/subscribe", fetchUser, subscribeToPackage);

// to get users subscribed packages
packagesRouter.get("/subscribed", fetchUser, getUserSubscribedPackages);

export default packagesRouter;
