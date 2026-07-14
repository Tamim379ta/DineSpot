"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const { error } = await signIn.email({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Invalid email or password");
      toast.error("Invalid email or password")
      return;
    }
    toast.success("Login Successfully")
    router.push("/");
  };

  const fillDemo = (role: "diner" | "owner") => {
    if (role === "diner") {
      setForm({ email: "diner@dinespot.com", password: "Demo@1234" });
    } else {
      setForm({ email: "owner@dinespot.com", password: "Demo@1234" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1C1C1E]">Welcome back 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Login to your DineSpot account</p>
        </div>

        {/* Demo Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => fillDemo("diner")}
            className="p-3 rounded-xl border-2 border-dashed border-[#00B37D] text-center hover:bg-[#F0FAF6] transition-all"
          >
            <div className="text-lg mb-1">🍽️</div>
            <div className="text-xs font-semibold text-[#00B37D]">Demo Diner</div>
          </button>
          <button
            onClick={() => fillDemo("owner")}
            className="p-3 rounded-xl border-2 border-dashed border-[#FF6B35] text-center hover:bg-orange-50 transition-all"
          >
            <div className="text-lg mb-1">🏪</div>
            <div className="text-xs font-semibold text-[#FF6B35]">Demo Owner</div>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or login with email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-[#00B37D] text-white font-semibold py-3 rounded-lg hover:bg-[#00a070] transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#00B37D] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}