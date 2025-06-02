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
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl mb-6">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Body*</label>
          <TextEditor content={body} onChange={setBody} />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category*</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Image (required)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Preview"
              className="mt-2 max-h-48 object-contain rounded"
            />
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Update Blog
        </button>
      </form>
    </main>
  );
}
