import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Blog App</h1>
      <p className="text-lg mb-6">
        Discover posts on technology, travel, food, and more.
      </p>
      <Link href="/blogs">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          View Blogs
        </button>
      </Link>
    </main>
  );
}
