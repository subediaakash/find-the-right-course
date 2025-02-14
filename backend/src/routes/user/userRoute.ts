import { Router } from "express";
import { WishListController } from "../../controllers/user/wishList.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

const userRouter = Router();
userRouter.use(verifyToken);
const wishlistController = new WishListController();

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

export default userRouter;
