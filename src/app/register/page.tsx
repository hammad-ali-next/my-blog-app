"use client";
import { redirect, useRouter } from "next/navigation";
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

    const data = {
      name: name,
      email: email, // note: backend expects `email`, not `username`
      password: password,
    };
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
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-6xl text-center mb-10">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="m-2 space-y-3 flex flex-col mx-auto max-w-sm"
          >
            <div className="w-full">
              <label htmlFor="name" className="mr-2">
                Name
              </label>
              <input
                name="name"
                className="w-full border rounded-2xl border-blue-400 focus:border-blue-600 p-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Register
            </button>
          </form>

          {error && (
            <p className="mt-2 text-red-500 text-center font-medium">{error}</p>
          )}
          <div className="m-3">
            <span>
              Already have account?, click to{" "}
              <Link
                href="/login"
                className="underline text-blue-400 hover:text-blue-600 text-[20px] transition-all duration-300 ease-in-out"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
