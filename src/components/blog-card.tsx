import Image from "next/image";

type BlogCardProps = {
  blog: {
    id: number;
    title: string;
    image_base64: string;
    author_name: string;
    created_date: string;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm cursor-pointer flex flex-col">
      {/* Image container with padding and relative to clip scaled image */}
      <div className="relative overflow-hidden rounded-t-lg p-4 h-48">
        {blog.image_base64.startsWith("data:image") ? (
          <img
            src={blog.image_base64}
            alt={blog.title}
            className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
          />
        ) : (
          <Image
            src={blog.image_base64}
            alt={blog.title}
            fill
            sizes="(max-width: 400px) 100vw, 400px"
            className="object-cover rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
          />
        )}
      </div>

      {/* Content with padding and relative for arrow positioning */}
      <div className="flex flex-col flex-grow p-5 relative">
        {/* Title changes color on hover of entire card */}
        <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-red-600 hover:text-red-600 transition-colors duration-300">
          {blog.title}
        </h2>

        <p className="text-sm text-gray-600 mb-10">
          By <span className="font-medium">{blog.author_name}</span> -{" "}
          {blog.created_date}
        </p>

        {/* Arrow box */}
        <div
          className="
    absolute bottom-5 right-5
    flex items-center
    bg-red-600 text-white font-semibold
    rounded-tl-xl rounded-br-xl
    cursor-pointer overflow-hidden
    transition-all duration-300 ease-in-out
    w-10 h-10
    pr-3
    p-0
    justify-center
    group-hover:w-40
    group-hover:pl-4
    group-hover:pr-3
    group-hover:py-2
  "
        >
          <span
            className="
      mr-2 whitespace-nowrap
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
      select-none inline-block max-w-[100px] overflow-hidden
    "
          >
            Learn More
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
