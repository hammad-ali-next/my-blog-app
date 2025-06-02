"use client"; // Required for client-side logic

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

    checkAuth(); // Initial check on mount

    // Listen for custom "login" event and re-check auth when triggered
    const handleLoginEvent = () => {
      checkAuth();
    };

    window.addEventListener("login", handleLoginEvent);

    // Cleanup on unmount
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
    <nav className="m-6 bg-white border border-gray-200 rounded-2xl p-6 bg-amber-00 w-vh flex items-center justify-evenly">
      <Link href="/">
        <div className="flex max-w-7xl space-x-2 items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold text-blue-400">Bloogie</span>
        </div>
      </Link>

      <ul className="flex space-x-4">
        {categories.map((cat, index) => (
          <Link
            href={`/blogs?category=${cat.name.toLowerCase()}`}
            key={index}
            className="bg-blue-100 p-2 rounded-3xl hover:text-blue-500 hover:text-2xl duration-300 ease-in-out hover:transition-all cursor-pointer"
          >
            {cat.name}
          </Link>
        ))}
      </ul>

      {isLoggedIn ? (
        <div className="flex space-x-2">
          <button
            onClick={() => router.push("/blogs/my-blogs")}
            className="bg-green-100 p-2 rounded-3xl hover:text-green-500 duration-300 hover:text-2xl ease-in-out hover:transition-all cursor-pointer"
          >
            My Blogs
          </button>
          <button
            onClick={() => router.push("/blogs/create")}
            className="bg-green-100 p-2 rounded-3xl hover:text-green-500 duration-300 hover:text-2xl ease-in-out hover:transition-all cursor-pointer"
          >
            Create Blog
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-100 p-2 rounded-3xl hover:text-red-500 hover:text-2xl duration-300 ease-in-out hover:transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-100 p-2 rounded-3xl hover:text-blue-500 hover:text-2xl duration-300 ease-in-out hover:transition-all cursor-pointer"
        >
          Log In
        </button>
      )}
    </nav>
  );
}
