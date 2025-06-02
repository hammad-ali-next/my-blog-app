import BlogCard from "@/components/blog-card";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import Link from "next/link";

export type blogCard = {
  id: number;
  title: string;
  image_base64: string;
  author_name: string;
  created_date: string;
};

const DEFAULT_IMAGE = "/logo.png";

export default async function Blogs({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const category = (await searchParams)?.category?.toLowerCase();
  const url = category ? `/blogs?category=${category}` : "/blogs";

  try {
    const response = await axiosInstance.get(url);
    const blogs: blogCard[] = response.data.map((b: any) => ({
      id: b.id,
      title: b.title,
      image_base64: b.image_base64,
      author_name: b.creator.name,
      created_date: b.created_date || "time",
    }));
    console.log("Fetched blogs:", blogs);

    return (
      <main className="p-8 bg-gray-50 min-h-screen rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Blogs
        </h1>

        {category && (
          <p className="text-center text-gray-600 mb-8">
            Showing blogs in category:{" "}
            <span className="capitalize font-semibold text-gray-800">
              {category}
            </span>
          </p>
        )}

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No blogs found{category ? ` in category "${category}"` : ""}.
          </p>
        ) : (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <Link key={b.id} href={`/blogs/${b.id}`} className="group">
                <BlogCard blog={b} />
              </Link>
            ))}
          </div>
        )}
      </main>
    );
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    console.error("Failed to fetch blogs:", error);

    const errorMessage =
      error.response?.data?.detail || "Unknown error occurred";

    return (
      <div className="p-3 text-center text-red-500 border-red-500 border rounded-2xl mt-6">
        Error: {errorMessage}
      </div>
    );
  }
}
