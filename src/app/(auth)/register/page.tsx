"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "diner",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
 // @ts-ignore
const { error } = await signUp.email({
  name: form.name,
  email: form.email,
  password: form.password,
  role: form.role,
});
    setLoading(false);
    if (error) {
      setError(error.message || "Something went wrong");
      return;
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1C1C1E]">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join DineSpot today</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setForm({ ...form, role: "diner" })}
            className={`p-4 rounded-xl border-2 text-center transition-all ${form.role === "diner"
                ? "border-[#00B37D] bg-[#F0FAF6]"
                : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <div className="text-2xl mb-1">🍽️</div>
            <div className="font-semibold text-sm text-[#1C1C1E]">I'm a Diner</div>
            <div className="text-xs text-gray-400 mt-1">Discover & book tables</div>
          </button>
          <button
            onClick={() => setForm({ ...form, role: "owner" })}
            className={`p-4 rounded-xl border-2 text-center transition-all ${form.role === "owner"
                ? "border-[#00B37D] bg-[#F0FAF6]"
                : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <div className="text-2xl mb-1">🏪</div>
            <div className="font-semibold text-sm text-[#1C1C1E]">I'm an Owner</div>
            <div className="text-xs text-gray-400 mt-1">List your restaurant</div>
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
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
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#00B37D] font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}