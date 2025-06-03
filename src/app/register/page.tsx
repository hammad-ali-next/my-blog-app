"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { AxiosError } from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { name, email, password };
    try {
      const response = await axiosInstance.post("/users/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Register Success", response.data);
      router.push("/login");
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      const errorMessage =
        error.response?.data?.detail || "Unknown error occurred";

      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
        <h1 className="text-5xl text-center mb-10 font-bold text-red-600">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              className="block bg-gray-50 px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-[5px] border border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            />
            <label
              htmlFor="name"
              className="absolute text-sm bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white peer-placeholder-shown:text-gray-500 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-focus:scale-100 peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:-translate-y-4 start-2"
            >
              Name <span className="text-red-600">*</span>
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="block bg-gray-50 px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-[5px] border border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            />
            <label
              htmlFor="email"
              className="absolute text-sm bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white peer-placeholder-shown:text-gray-500 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-focus:scale-100 peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:-translate-y-4 start-2"
            >
              Email <span className="text-red-600">*</span>
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="block bg-gray-50 px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-[5px] border border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            />
            <label
              htmlFor="password"
              className="absolute text-sm bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white peer-placeholder-shown:text-gray-500 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-focus:scale-100 peer-focus:text-black peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:-translate-y-4 start-2"
            >
              Password <span className="text-red-600">*</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-2 bg-black text-white rounded-[5px] font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              Register
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium select-none">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-600 underline hover:text-red-800 transition-colors duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
