// src/app  -> page.tsx

import BlogCard from "@/components/blog-card";
import Link from "next/link";

export type blogCard = {
  id: number;
  title: string;
  image: typeof Image;
  author_name: string;
  created_date: string;
};

export default function Home() {
  const blogs = [
    {
      id: 1,
      title: "Why FastAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      id: 2,
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      id: 3,
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      id: 4,
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      id: 5,
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
  ];

  return (
    <>
      <h1 className="text-3xl text-center m-6">Blogs</h1>
      <div className="container mx-20 flex flex-wrap gap-6 justify-evenly">
        {blogs.map((b, index) => (
          <Link key={index} href={`/blogs/${b.id}`}>
            <BlogCard key={index} blog={b} />
          </Link>
        ))}
      </div>
    </>
  );
}
