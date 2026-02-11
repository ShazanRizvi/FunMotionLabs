import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogPost = ({ blog }) => {
  if (!blog) return null;

  const initials = blog.author
    ? blog.author
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : "";

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const markdownContent = Array.isArray(blog.content)
    ? blog.content.join("\n\n")
    : blog.content ?? "";

  return (
    <div className="w-full bg-neutral-100">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[55vh] min-h-[360px] overflow-hidden"
      >
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_45%)]" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white"
        >
          <div className="flex items-center gap-3 text-sm text-white/80 outfit-regular">
            <span>{blog.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/60" />
            <span>{blog.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mt-3 outfit-regular tracking-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
            <p className="text-white/80 outfit-regular">By {blog.author}</p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-6 sm:px-8 py-12"
      >
        <motion.div
          variants={item}
          className="sticky top-24 z-50 mb-10 flex items-center justify-between rounded-full border border-white/70 bg-white px-5 py-3 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] backdrop-blur-sm"
        >
          <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-blue-600 outfit-regular font-medium hover:text-blue-700"
            >
              <span className="text-lg">←</span>
              Back to Blogs
            </Link>
          </motion.div>
          <motion.div
            variants={item}
            className="flex items-center gap-3 text-sm text-gray-500"
          >
            <span className="px-3 py-1 rounded-full bg-white shadow-sm border border-gray-200">
              Featured
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-xl border border-white/70"
        >
          <div className="prose prose-lg max-w-none prose-headings:outfit-bold prose-p:outfit-regular prose-li:outfit-regular prose-a:text-blue-600 prose-strong:text-gray-900 text-gray-800">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default BlogPost;
