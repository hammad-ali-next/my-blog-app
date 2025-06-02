"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { AxiosError } from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    try {
      const response = await axiosInstance.post("/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Login Success", response.data);
      window.dispatchEvent(new Event("login"));
      router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      const errorMessage =
        error.response?.data?.detail || "Unknown error occurred";

      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-lg border border-red-200">
        <h1 className="text-5xl text-center mb-10 font-bold text-red-600">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              required
              className="w-full border border-red-400 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-600 transition"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              required
              className="w-full border border-red-400 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-600 transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-2xl font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Log In
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium select-none">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-red-600 underline hover:text-red-800 transition-colors duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
