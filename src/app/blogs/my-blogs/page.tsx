"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import BlogCard from "@/components/blog-card";
import Link from "next/link";
import { AxiosError } from "axios";

export type blogCard = {
  id: number;
  title: string;
  image_url: string;
  author_name: string;
  created_date: string;
};

type RawBlog = {
  id: number;
  title: string;
  image_url: string;
  creator: { name: string };
  created_date?: string;
};

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<blogCard[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/users/blogs")
      .then((res) => {
        const blogData: blogCard[] = res.data.map((b: RawBlog) => ({
          id: b.id,
          title: b.title,
          image_url: b.image_url,
          author_name: b.creator.name,
          created_date: b.created_date || "time",
        }));
        setBlogs(blogData);
        setLoading(false);
      })
      .catch((err: AxiosError<{ detail?: string }>) => {
        console.error("Failed to fetch blogs:", err);
        const message = err.response?.data?.detail || "Unknown error occurred";
        setError(message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    setError("");

    try {
      await axiosInstance.delete(`/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id)); // <-- update UI
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      setError(error.response?.data?.detail || "Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-lg mx-auto mt-10 text-center text-red-600 border border-red-400 rounded-2xl">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="p-8 px-80 min-h-screen rounded-2xl">
      <h1 className="text-[90px] font-bold text-center mb-8 text-gray-900">
        My Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven&apos;t created any blogs yet.
        </p>
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <div key={b.id} className="flex flex-col">
              <Link href={`/blogs/${b.id}`} className="group">
                <BlogCard blog={b} />
              </Link>

              <div className="flex justify-center gap-4 mt-3">
                <Link
                  href={`/blogs/${b.id}/edit`}
                  className="px-4 py-2 rounded-[5px] bg-yellow-300 text-yellow-900 font-semibold hover:bg-yellow-400 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="px-4 py-2 rounded-[5px] bg-red-300 text-red-900 font-semibold hover:bg-red-400 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
