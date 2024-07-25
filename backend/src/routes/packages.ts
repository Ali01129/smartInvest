import express, { Request, Response } from "express";
import fetchUser from "../middleware/fetchUser";
import Package from "../models/package";
import User from "../models/user";
import Wallet from "../models/wallet";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const packagesRouter = express.Router();

const getAllPackages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user) {
      const packages = await Package.find();
      return res.status(200).send({ status: "success", packages });
    } else {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Get packages error:", error);
    return res
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

// route to get all packages
packagesRouter.get("/", fetchUser, getAllPackages);

const subscribeToPackage = async (req: AuthenticatedRequest, res: Response) => {
  const { packageId } = req.body;
  const user = req.user;

  try {
    const packageToSubscribe = await Package.findOne({ _id: packageId });
    if (!packageToSubscribe) {
      return res
        .status(404)
        .send({ status: "error", message: "Package not found" });
    } else {
      const userSubscribed = await User.findOne({ _id: user.id });
      const walletOfUser = await Wallet.findOne({ userId: user.id });
      if (!userSubscribed || !walletOfUser) {
        return res
          .status(404)
          .send({ status: "error", message: "User or wallet not found" });
      } else {
        userSubscribed.packagesSubscribed?.push({
          packageId: packageId,
        });
        walletOfUser.stackedCoins += packageToSubscribe.profit;
        walletOfUser.smartCoin -= packageToSubscribe.profit;
        await userSubscribed.save();
        await walletOfUser.save();
        return res
          .status(200)
          .send({ status: "success", message: "Subscribed successfully" });
      }
    }
  } catch (error) {
    console.error("Subscription error:", error);
    return res
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};
// route to subscribe to a package
packagesRouter.patch("/subscribe", fetchUser, subscribeToPackage);

const getUserSubscribedPackages = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;

  try {
    const userSubscribed = await User.findOne({ _id: user.id });
    if (!userSubscribed) {
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });
    } else {
      return res.status(200).send({
        status: "success",
        packages: userSubscribed.packagesSubscribed,
      });
    }
  } catch (error) {
    console.error("Get subscribed packages error:", error);
    return res
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
};

// to get users subscribed packages
packagesRouter.get("/subscribed", fetchUser, getUserSubscribedPackages);

export default packagesRouter;
