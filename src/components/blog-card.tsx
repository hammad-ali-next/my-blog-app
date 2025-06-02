import Image from "next/image";

type BlogCardProps = {
  blog: {
    id: number;
    title: string;
    image_base64: string; // base64 or URL
    author_name: string;
    created_date: string;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="max-w-xs rounded shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {blog.image_base64.startsWith("data:image") ? (
        <img
          src={blog.image_base64}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <Image
          src={blog.image_base64}
          alt={blog.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
          priority={false}
        />
      )}

      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2">{blog.title}</h2>
        <p className="text-sm text-gray-500">
          By {blog.author_name} - {blog.created_date}
        </p>
      </div>
    </div>
  );
}
