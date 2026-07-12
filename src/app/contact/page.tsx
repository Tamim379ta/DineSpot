"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      {/* Hero */}
      <div className="bg-[#1C1C1E] py-20 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">Contact <span className="text-[#00B37D]">Us</span></h1>
        <p className="text-gray-400 text-lg">We'd love to hear from you. Reach out anytime!</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#1C1C1E]">Get in Touch</h2>
          <p className="text-gray-500 leading-relaxed">
            Have a question, suggestion, or want to list your restaurant on DineSpot? We're here to help!
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F0FAF6] rounded-lg flex items-center justify-center text-[#00B37D]">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-semibold text-[#1C1C1E]">support@dinespot.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F0FAF6] rounded-lg flex items-center justify-center text-[#00B37D]">
                <FaPhone />
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="font-semibold text-[#1C1C1E]">+880 1700-000000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F0FAF6] rounded-lg flex items-center justify-center text-[#00B37D]">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs text-gray-400">Address</p>
                <p className="font-semibold text-[#1C1C1E]">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-5xl mb-4">🎉</p>
              <h3 className="font-bold text-[#1C1C1E] text-xl mb-2">Message Sent!</h3>
              <p className="text-gray-500">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
              />
              <textarea
                rows={5}
                placeholder="Your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] resize-none"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-[#00B37D] text-white font-semibold py-3 rounded-lg hover:bg-[#00a070] transition-colors"
              >
                Send Message
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}