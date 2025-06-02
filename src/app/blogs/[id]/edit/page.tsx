"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});
export type Category = {
  name: string;
};

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { name: "Technology" },
    { name: "Travel" },
    { name: "Food" },
  ];

  useEffect(() => {
    axiosInstance.get("/profile").catch(() => {
      router.push("/login");
    });

    axiosInstance
      .get(`/blogs/${id}`)
      .then((res) => {
        const blog = res.data;
        setTitle(blog.title);
        setBody(blog.body);
        setCategory(blog.category ? capitalize(blog.category) : "");
        setImageBase64(blog.image_base64 || null);
      })
      .catch(() => {
        setError("Failed to load blog");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !body || !category || !imageBase64) {
      setError("Please fill all required fields and upload an image");
      return;
    }

    try {
      const sanitizedBody = DOMPurify.sanitize(body);

      await axiosInstance.put(`/blogs/${id}`, {
        title,
        body: sanitizedBody,
        category: category.toLowerCase(),
        image_base64: imageBase64,
      });

      router.push(`/blogs/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update blog");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-red-700">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2 text-red-700">
            Title*
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-red-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-red-700">Body*</label>
          <div className="border border-red-300 rounded-xl focus-within:ring-2 focus-within:ring-red-400 transition">
            <TextEditor content={body} onChange={setBody} />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-red-700">
            Category*
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-red-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-red-700">
            Image (required)
          </label>

          {/* Custom file input */}
          <label
            htmlFor="imageUpload"
            className="inline-block cursor-pointer rounded-xl border border-dashed border-red-400 px-6 py-4 text-red-600 hover:border-red-600 hover:text-red-700 transition text-center w-full"
          >
            Choose an image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {imageBase64 && (
            <div className="mt-4 rounded-xl overflow-hidden border border-red-300 shadow-md max-h-64 w-full">
              <img
                src={imageBase64}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition"
        >
          Update Blog
        </button>
      </form>
    </main>
  );
}
