// blogs -> [id] -> page.tsx
"use client";
import React from "react";
import { use } from "react";
import axiosInstance from "@/utils/axiosInstance";

export default function Blog_With_ID({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  //   const response = new axiosInstance.get(`/blogs/${id}`);
  return <div>blog with {id}</div>;
}
