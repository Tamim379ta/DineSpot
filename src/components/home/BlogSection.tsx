"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


const blogs = [
  {
    slug: "top-10-restaurants-dhaka",
    title: "Top 10 Restaurants to Visit in Dhaka This Year",
    excerpt: "From fine dining to street food gems, we cover the best spots that Dhaka has to offer in 2025.",
    category: "Food Guide",
    date: "July 5, 2025",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
  },
  {
    slug: "how-to-book-perfect-table",
    title: "How to Book the Perfect Table for Any Occasion",
    excerpt: "Whether it's a date night or a family dinner, here's how to make the most of your reservation.",
    category: "Tips & Tricks",
    date: "June 28, 2025",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600",
  },
  {
    slug: "rise-of-fine-dining-bangladesh",
    title: "The Rise of Fine Dining Culture in Bangladesh",
    excerpt: "Bangladesh's restaurant scene is evolving fast. Here's a look at how fine dining is taking over.",
    category: "Food Culture",
    date: "June 20, 2025",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#1C1C1E]">Food Stories & Guides</h2>
            <p className="text-gray-500 mt-2">Tips, trends and tales from the dining world</p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#00B37D] hover:underline hidden md:block"
          >
            View All →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={500}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-semibold text-[#00B37D] uppercase tracking-wide">
                  {blog.category}
                </span>
                <h3 className="font-bold text-[#1C1C1E] mt-2 mb-2 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{blog.date}</span>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-semibold text-[#00B37D] hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}