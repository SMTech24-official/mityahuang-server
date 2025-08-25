import { Router } from "express";
import { blogController } from "../controller/blog.controller";
import sanitizeInputData from "../../../middleware/sanitizeClientDataViaZod";
import { blogValidationSchema } from "../validation/blog.validation";
import { multerUpload } from "../../../middleware/multer";

const router = Router();

// ** get all blogs
router.route("/").get(blogController.getAllBlogs);

// ** get blog by id
router.route("/:id").get(blogController.getSingleBlog);

// ** create blog
router
  .route("/")
  .post(
    multerUpload("blogs").single("image"),
    sanitizeInputData(blogValidationSchema.newBlogSchema),
    blogController.createNewBlog,
  );

// ** update blog
router
  .route("/:id")
  .patch(
    multerUpload("blogs").single("image"),
    sanitizeInputData(blogValidationSchema.updateBlogSchema),
    blogController.updateBlog,
  );

// ** delete blog
router.route("/:id").delete(blogController.deleteBlog);

export const BlogRoutes = router;
