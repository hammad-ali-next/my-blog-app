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
      <main className="p-6">
        <h1 className="text-3xl text-center mb-4">Blogs</h1>

        {category && (
          <p className="text-center text-gray-600 mb-6">
            Showing blogs in category:{" "}
            <span className="capitalize font-semibold">{category}</span>
          </p>
        )}

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs found{category ? ` in category "${category}"` : ""}.
          </p>
        ) : (
          <div className="container mx-auto flex flex-wrap gap-6 justify-evenly">
            {blogs.map((b) => (
              <Link key={b.id} href={`/blogs/${b.id}`}>
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
