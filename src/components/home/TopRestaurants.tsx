"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const restaurants = [
  {
    id: 1,
    name: "The Golden Fork",
    cuisine: "Italian",
    rating: 4.8,
    reviews: 234,
    priceRange: "$$$",
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
  },
  {
    id: 2,
    name: "Sakura Garden",
    cuisine: "Japanese",
    rating: 4.7,
    reviews: 189,
    priceRange: "$$$",
    location: "Chittagong",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600",
  },
  {
    id: 3,
    name: "Spice Route",
    cuisine: "Indian",
    rating: 4.6,
    reviews: 312,
    priceRange: "$$",
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600",
  },
  {
    id: 4,
    name: "Burger Republic",
    cuisine: "American",
    rating: 4.5,
    reviews: 156,
    priceRange: "$$",
    location: "Sylhet",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
  },
];

export default function TopRestaurants() {
  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1C1C1E]">Top Rated Restaurants</h2>
          <p className="text-gray-500 mt-2">Handpicked favorites loved by diners</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((r, index) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#00B37D] text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {r.cuisine}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#1C1C1E] text-lg truncate">{r.name}</h3>

                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <span className="text-sm font-medium text-[#1C1C1E]">{r.rating}</span>
                  <span className="text-sm text-gray-400">({r.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">📍 {r.location}</span>
                  <span className="text-sm font-medium text-[#FF6B35]">{r.priceRange}</span>
                </div>

                <Link
                  href={`/restaurants/${r.id}`}
                  className="mt-4 block text-center bg-[#00B37D] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#00a070] transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}