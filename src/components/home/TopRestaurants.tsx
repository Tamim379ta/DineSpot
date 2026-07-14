"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  averageRating: number;
  totalReviews: number;
  priceRange: string;
  city: string;
  coverImage: string;
}

export default function TopRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRestaurants = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants?sortBy=rating&limit=4`
      );
      const data = await res.json();
      setRestaurants(data.restaurants);
      setLoading(false);
    };
    fetchTopRestaurants();
  }, []);

  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1C1C1E]">Top Rated Restaurants</h2>
          <p className="text-gray-500 mt-2">Handpicked favorites loved by diners</p>
        </div>

        {/* Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No restaurants available yet.</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((r, index) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={r.coverImage}
                    alt={r.name}
                     width={600}
                height={500}
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
                    <span className="text-sm font-medium text-[#1C1C1E]">{r.averageRating || "New"}</span>
                    <span className="text-sm text-gray-400">({r.totalReviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">📍 {r.city}</span>
                    <span className="text-sm font-medium text-[#FF6B35]">{r.priceRange}</span>
                  </div>

                  <Link
                    href={`/restaurants/${r._id}`}
                    className="mt-4 block text-center bg-[#00B37D] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#00a070] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}