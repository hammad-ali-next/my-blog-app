import Image from "next/image";

export type blogCard = {
  blog: {
    title: string;
    image: string;
    author_name: string;
    created_date: string;
  };
};

export default function BlogCard({ blog }: blogCard) {
  return (
    <div className="flex m-3 p-3 rounded-2xl hover:shadow-2xl duration-200">
      <div className="rounded-2xl p-4 hover:shadow-md transition-shadow duration-300">
        {blog.image && (
          <div className="w-80">
            <Image
              src={blog.image}
              alt={blog.title}
              width={70}
              height={70}
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
        <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 mt-2">By {blog.author_name}</p>
          <p className="text-gray-600 mt-1 ">{blog.created_date}</p>
        </div>
      </div>
    </div>
  );
}
