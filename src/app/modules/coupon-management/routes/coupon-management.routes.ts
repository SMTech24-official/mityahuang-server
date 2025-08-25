import { Router } from "express";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { couponController } from "../controller/coupon-management.controller";
import { couponManagementValidation } from "../validation/coupon-management.validation";

const router = Router();

// ** get all coupon
router.route("/").get(couponController.getAllCoupon);

// ** get Coupon by id
router.route("/:id").get(couponController.getSingleCoupon);

// ** create Coupon
router
  .route("/")
  .post(
    sanitizeInputData(couponManagementValidation.newCouponSchema),
    couponController.createNewCoupon,
  );

// ** update Coupon
router
  .route("/:id")
  .patch(
    sanitizeInputData(couponManagementValidation.updateCouponSchema),
    couponController.updateCoupon,
  );

// ** delete Coupon
router.route("/:id").delete(couponController.deleteCoupon);

export const CouponRoutes = router;
