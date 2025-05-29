"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

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
      const response = await axiosInstance.post(
        // 'https://fast-api-first.vercel.app/login',
        "/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Login Success", response.data);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials or server.");
    }
  };
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-6xl text-center mb-10">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="m-2 space-y-3 flex flex-col mx-auto max-w-sm"
          >
            <div className="w-full">
              <label htmlFor="email" className="mr-2">
                Email
              </label>
              <input
                name="email"
                className="w-full border rounded-2xl border-blue-400 focus:border-blue-600 p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="mr-2">
                Password
              </label>
              <input
                name="password"
                className="w-full border rounded-2xl border-blue-400 focus:border-blue-600  p-2"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="p-2 bg-blue-400 rounded-2xl hover:bg-blue-600">
              Log In
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
