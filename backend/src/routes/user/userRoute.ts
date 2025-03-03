import { Router } from "express";
import { WishListController } from "../../controllers/user/wishList.controller";
import { HistoryController } from "../../controllers/user/history.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { ProfileController } from "../../controllers/user/profile.controller";

const userRouter = Router();
userRouter.use(verifyToken);
const wishlistController = new WishListController();
const historyController = new HistoryController();
const profileController = new ProfileController();

userRouter.post("/wishlist/add", (req, res) =>
  wishlistController.addCourseToTheWishlist(req, res)
);

userRouter.delete("/wishlist/:wishlistId", (req, res) =>
  wishlistController.removeCourseFromWishlist(req, res)
);

userRouter.get("/wishlist", (req, res) =>
  wishlistController.getWishlist(req, res)
);

userRouter.get("/wishlist/:wishlistId/status", (req, res) =>
  wishlistController.isInWishlist(req, res)
);

userRouter.post("/history/add", (req, res) =>
  historyController.addToHistory(req, res)
);

userRouter.delete("/history/clear", (req, res) =>
  historyController.clearHistory(req, res)
);

userRouter.delete("/history/:historyId", (req, res) =>
  historyController.removeFromHistory(req, res)
);

userRouter.get("/history", (req, res) =>
  historyController.getHistory(req, res)
);

userRouter.get("/profile", (req, res) => {
  profileController.getUserProfile(req, res);
});

export default userRouter;
