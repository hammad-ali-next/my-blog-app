// src/app  -> page.tsx

import BlogCard from "@/components/blog-card";

export type blogCard = {
  title: string;
  image: typeof Image;
  author_name: string;
  created_date: string;
};

export default function Home() {
  const blogs = [
    {
      title: "Why FastAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
    {
      title: "stAPI is Awesome",
      image: "/logo.png",
      author_name: "Hammad",
      created_date: "12may",
    },
  ];

  return (
    <>
      <h1 className="text-3xl text-center">Blogs</h1>
      <div className="container mx-20 border flex flex-wrap gap-6 justify-center">
        {blogs.map((b, index) => (
          <BlogCard key={index} blog={b} />
        ))}
      </div>
    </>
  );
}
