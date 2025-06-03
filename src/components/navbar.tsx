"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

export type Category = {
  name: string;
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Track current path

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
  }, [pathname]); // Re-run effect when route changes

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
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 p-4 w-full h-[100px] mx-auto flex flex-wrap items-center justify-between gap-4">
      <Link href="/" className="flex pl-44 items-center space-x-3">
        <Image
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
        <span className="text-2xl font-bold text-black hover:text-red-600 transition-colors duration-300">
          Bloogie
        </span>
      </Link>

      <ul className="flex space-x-6 text-gray-700 font-semibold">
        {categories.map((cat, index) => (
          <Link
            href={`/blogs?category=${cat.name.toLowerCase()}`}
            key={index}
            className="px-4 py-2 font-bold hover:text-red-600 transition-colors duration-300 cursor-pointer"
          >
            {cat.name}
          </Link>
        ))}
      </ul>

      <div className="flex space-x-4 items-center pr-44">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => router.push("/blogs/my-blogs")}
              className="px-4 py-2 bg-black  text-white rounded-[5px] font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              My Blogs
            </button>
            <button
              onClick={() => router.push("/blogs/create")}
              className="px-4 py-2 bg-black  text-white rounded-[5px] font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              Create Blog
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black  text-white rounded-[5px] font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-black  text-white rounded-[5px] font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}
