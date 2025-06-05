"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";
import { AxiosError } from "axios";
import Image from "next/image";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

export type Category = {
  name: string;
};

export default function CreateBlogPage() {
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get("/profile").catch(() => {
      router.push("/login");
    });
  }, [router]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [aspectRatio, setAspectRatio] = useState(1);

  const categories: Category[] = [
    { name: "Technology" },
    { name: "Travel" },
    { name: "Food" },
  ];

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
      await axiosInstance.post("/blogs", {
        title,
        body: sanitizedBody,
        category: category.toLowerCase(),
        image_base64: imageBase64,
      });

      router.push("/blogs");
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      setError(error.response?.data?.detail || "Failed to create blog");
    }
  };
  useEffect(() => {
    if (!imageBase64) return;

    const img = new window.Image();
    img.src = imageBase64;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [imageBase64]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
        <h1 className="text-5xl text-center mb-10 font-bold text-red-600">
          Create Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
              className="block bg-gray-50 px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-[5px] border border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            />
            <label
              htmlFor="title"
              className="absolute text-sm bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white peer-placeholder-shown:text-gray-500 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-focus:scale-100 peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:-translate-y-4 start-2"
            >
              Title <span className="text-red-600">*</span>
            </label>
          </div>

          {/* Body */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Body <span className="text-red-600">*</span>
            </label>
            <div className="border border-gray-200 rounded-[5px] focus-within:ring-1 focus-within:ring-black transition">
              <TextEditor content={body} onChange={setBody} />
            </div>
          </div>

          {/* Category */}
          <div className="relative">
            <select
              id="category"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block bg-gray-50 px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-[5px] border border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            >
              <option value="" disabled hidden></option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="category"
              className="absolute text-sm bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white peer-placeholder-shown:text-gray-500 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:-translate-y-4 start-2"
            >
              Category <span className="text-red-600">*</span>
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image (required)
            </label>
            <label
              htmlFor="imageUpload"
              className="inline-block cursor-pointer rounded-[5px] border border-dashed border-gray-400 px-6 py-4 text-black hover:border-black hover:text-red-600 transition text-center w-full"
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
              <div
                className="relative mt-4 rounded-[5px] overflow-hidden shadow-2xl max-h-64 mx-auto"
                style={{ aspectRatio: aspectRatio }}
              >
                <Image
                  src={imageBase64}
                  alt="Preview"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="100vw"
                  priority={true}
                />
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-red-600 font-medium">{error}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-2 bg-black text-white rounded-[5px] font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
