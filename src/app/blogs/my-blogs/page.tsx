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
    return <div className="text-center mt-6 text-blue-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-3 text-center text-red-500 border-red-500 border rounded-2xl mt-6">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl text-center mb-4">Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found!</p>
      ) : (
        <div className="container mx-auto flex flex-wrap gap-6 justify-evenly">
          {blogs.map((b) => (
            <div key={b.id}>
              <Link href={`/blogs/${b.id}`}>
                <BlogCard blog={b} />
              </Link>
              <div className="flex space-x-3 mt-2">
                <Link
                  href={`/blogs/${b.id}/edit`}
                  className="bg-yellow-200 px-4 py-1 rounded hover:bg-yellow-300"
                >
                  Edit
                </Link>
                <Link
                  href={`/blogs/delete/${b.id}`}
                  className="bg-red-200 px-4 py-1 rounded hover:bg-red-300"
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
