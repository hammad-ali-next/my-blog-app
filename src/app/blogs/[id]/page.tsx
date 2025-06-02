import React from "react";
import { use } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import Image from "next/image";

export default async function Blog_With_ID({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  try {
    const response = await axiosInstance.get(`/blogs/${id}`);
    const data = response.data;

    return (
      <article className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-gray-600 text-sm">
            By <span className="font-semibold">{data.creator.name}</span>
          </p>
        </header>

        <figure className="mb-8">
          <Image
            src={data.image_base64} // your base64 string here
            width={800}
            height={450}
            alt={data.title}
            className="rounded-md object-contain max-w-full h-auto mx-auto"
          />
        </figure>

        <section className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </section>
      </article>
    );
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    console.error("Failed to fetch blog:", error);

    const errorMessage =
      error.response?.data?.detail || "Unknown error occurred";

    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-600 border border-red-600 rounded-xl bg-red-50">
        <p className="font-semibold text-lg">Error: {errorMessage}</p>
      </div>
    );
  }
}
