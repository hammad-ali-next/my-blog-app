"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

export type Category = {
  name: string;
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const categories: Category[] = [
    { name: "Technology" },
    { name: "Travel" },
    { name: "Food" },
  ];

  useEffect(() => {
    const checkAuth = () => {
      axiosInstance
        .get("/profile")
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
    };

    checkAuth();

    const handleLoginEvent = () => {
      checkAuth();
    };

    window.addEventListener("login", handleLoginEvent);

    return () => {
      window.removeEventListener("login", handleLoginEvent);
    };
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      setIsLoggedIn(false);
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white shadow-md rounded-2xl p-4 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
        <span className="text-2xl font-extrabold text-gray-900 hover:text-red-600 transition-colors duration-300">
          Bloogie
        </span>
      </Link>

      <ul className="flex space-x-6 text-gray-700 font-semibold">
        {categories.map((cat, index) => (
          <Link
            href={`/blogs?category=${cat.name.toLowerCase()}`}
            key={index}
            className="px-4 py-2 rounded-full text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-300 cursor-pointer"
          >
            {cat.name}
          </Link>
        ))}
      </ul>

      <div className="flex space-x-4 items-center">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => router.push("/blogs/my-blogs")}
              className="px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              My Blogs
            </button>
            <button
              onClick={() => router.push("/blogs/create")}
              className="px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              Create Blog
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}
