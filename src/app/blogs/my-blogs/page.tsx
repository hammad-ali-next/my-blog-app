"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import BlogCard from "@/components/blog-card";
import Link from "next/link";
import { AxiosError } from "axios";

export type blogCard = {
  id: number;
  title: string;
  image_base64: string;
  author_name: string;
  created_date: string;
};

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<blogCard[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/users/blogs")
      .then((res) => {
        const blogData: blogCard[] = res.data.map((b: any) => ({
          id: b.id,
          title: b.title,
          image_base64: b.image_base64,
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
    <main className="p-8 bg-gray-50 min-h-screen rounded-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No blogs found!</p>
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
                  className="px-4 py-2 rounded-full bg-yellow-300 text-yellow-900 font-semibold hover:bg-yellow-400 transition"
                >
                  Edit
                </Link>
                <Link
                  href={`/blogs/delete/${b.id}`}
                  className="px-4 py-2 rounded-full bg-red-300 text-red-900 font-semibold hover:bg-red-400 transition"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
