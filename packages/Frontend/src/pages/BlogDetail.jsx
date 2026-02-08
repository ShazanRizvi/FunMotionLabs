import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BlogPost from "../AppComponents/BlogPost";
import { getBlogById } from "@/lib/blogs.js";

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const blogFromState = location.state?.blog;
  const blog =
    blogFromState && String(blogFromState.id) === String(id)
      ? blogFromState
      : getBlogById(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-6">
        <div className="max-w-xl text-center bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold">Blog not found</h2>
          <p className="text-gray-600 mt-2">
            The blog you are looking for does not exist or was moved.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <BlogPost blog={blog} />
    </div>
  );
};

export default BlogDetail;
