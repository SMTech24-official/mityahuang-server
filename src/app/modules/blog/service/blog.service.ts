import { Blog } from "@prisma/client";
import { I_PaginationResponse } from "../../../../interface/common.interface";
import { blogRepository } from "../repository/blog.repository";
import AppError from "../../../../errors/appError";
import { HttpStatusCode } from "axios";
import constructUrlAndImageUploaderUtil from "../../../../lib/utils/constructCloudinaryUrlAndUploadImage";
import { deleteFileByUrl } from "../../../../lib/utils/unlinkExistingFile";

// ** get all blogs
const getAllBlogs = async (query?: Record<string, any>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = Number(page - 1) * limit || 0;

  // get total count of contact us
  const totalCount = await blogRepository.getBlogCount();

  // calculate total page for pagination
  const totalPages = Math.ceil(totalCount / limit);

  const result = await blogRepository.getAllBlogs(limit, skip, query!);

  const paginationSchema: I_PaginationResponse<Blog[]> = {
    meta: {
      totalCount,
      totalPages,
      page,
      limit,
    },
    result,
  };

  return paginationSchema;
};

// ** get blog by id
const getSingleBlog = async (id: string) => {
  const blogExist = await blogRepository.getSingleBlog(id);

  if (!blogExist) {
    throw new AppError(HttpStatusCode.NotFound, "Blog not found");
  }

  return blogExist;
};

// ** create new blog
const createNewBlog = async (payload: Blog, file: Express.Multer.File) => {
  if (!file) {
    throw new AppError(
      HttpStatusCode.NotAcceptable,
      "Blog thumbnail not provided",
    );
  }

  const fileUrl = await constructUrlAndImageUploaderUtil(file, "blogs");

  return await blogRepository.createNewBlog({
    ...payload,
    blogThumbnailUrl: fileUrl,
  });
};

// ** update blog
const updateBlog = async (
  id: string,
  payload: Partial<Blog>,
  file: Express.Multer.File,
) => {
  const blogExist = await blogRepository.getSingleBlog(id);

  if (!blogExist) {
    throw new AppError(HttpStatusCode.NotFound, "Blog not found");
  }

  let fileUrl;

  if (file) {
    const url = await constructUrlAndImageUploaderUtil(file, "blogs");
    await deleteFileByUrl(blogExist.blogThumbnailUrl);
    fileUrl = url;
  }

  return await blogRepository.updateBlog(id, {
    ...payload,
    blogThumbnailUrl: fileUrl || blogExist.blogThumbnailUrl,
  });
};

// ** delete blog
const deleteBlog = async (id: string) => {
  const blogExist = await blogRepository.getSingleBlog(id);

  if (!blogExist) {
    throw new AppError(HttpStatusCode.NotFound, "Blog not found");
  }

  return await blogRepository.deleteBlog(id);
};

export const blogService = {
  getAllBlogs,
  getSingleBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
