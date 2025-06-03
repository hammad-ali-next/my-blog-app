import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import Image from "next/image";
import ScrollProgressBar from "@/components/ScrollProgressBar";

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
      <>
        {/* Scroll progress bar placed at top so it sticks below navbar */}
        <ScrollProgressBar />

        <div className="w-full min-w-full bg-gray-100 py-12 px-6 grid grid-cols-6 gap-8 max-w-screen-xl mx-auto">
          {/* Left side: title and author */}
          <div className="col-span-1" />
          <div className="col-span-2 content-center pl-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
              {data.title}
            </h1>
            <p className="text-gray-600 text-lg">
              <span className=" text-gray-800">{data.creator.name}</span>
              <span className=" text-gray-800">
                {" "}
                <br />
                {new Date(data.created_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>

          {/* Right side: image */}
          <div className="col-span-2 pr-12">
            <Image
              src={data.image_base64}
              alt={data.title}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
          <div className="col-span-1" />
        </div>

        {/* Blog body */}
        <section className="max-w-3xl mx-auto bg-white px-6 py-12 border-t border-gray-200 mt-10 prose prose-lg text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </section>
      </>
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
