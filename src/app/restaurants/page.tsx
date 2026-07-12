"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  city: string;
  priceRange: string;
  averageRating: number;
  totalReviews: number;
  coverImage: string;
  shortDescription: string;
}

const cuisineOptions = [
  "Italian", "Chinese", "Indian", "Japanese", "Mexican",
  "American", "Thai", "Mediterranean", "Bengali", "French",
];

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

 const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (cuisine) params.append("cuisine", cuisine);
      if (priceRange) params.append("priceRange", priceRange);
      if (minRating) params.append("minRating", minRating);
      if (sortBy) params.append("sortBy", sortBy);
      params.append("page", page.toString());
      params.append("limit", "8");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants?${params.toString()}`
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      // Use optional fallback || [] to guarantee it's always an array
      setRestaurants(data?.restaurants || []);
      setTotal(data?.total || 0);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      setRestaurants([]); // Fallback to safe empty array on failure
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [search, cuisine, priceRange, minRating, sortBy, page]);

  const totalPages = Math.ceil(total / 8);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      {/* Top Bar */}
      <div className="bg-[#1C1C1E] py-3">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-4">Explore Restaurants</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full max-w-xl px-4 py-3 rounded-lg text-sm outline-none text-[#1C1C1E]"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-[#1C1C1E] mb-4">Filters</h2>

              {/* Cuisine */}
              <div className="mb-5">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Cuisine</label>
                <select
                  value={cuisine}
                  onChange={(e) => { setCuisine(e.target.value); setPage(1); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
                >
                  <option value="">All Cuisines</option>
                  {cuisineOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Price Range</label>
                <div className="grid grid-cols-2 gap-2">
                  {["$", "$$", "$$$", "$$$$"].map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPriceRange(priceRange === p ? "" : p); setPage(1); }}
                      className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                        priceRange === p
                          ? "border-[#00B37D] bg-[#F0FAF6] text-[#00B37D]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-5">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Min Rating</label>
                <div className="space-y-2">
                  {["3", "4", "4.5"].map((r) => (
                    <button
                      key={r}
                      onClick={() => { setMinRating(minRating === r ? "" : r); setPage(1); }}
                      className={`w-full py-2 rounded-lg border text-sm font-medium transition-all ${
                        minRating === r
                          ? "border-[#00B37D] bg-[#F0FAF6] text-[#00B37D]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      ⭐ {r}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => { setCuisine(""); setPriceRange(""); setMinRating(""); setSearch(""); setPage(1); }}
                className="w-full py-2 rounded-lg border border-red-300 text-red-400 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">

            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{total} restaurants found</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] bg-white"
              >
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl h-72 animate-pulse" />
                ))}
              </div>
          ) : !restaurants || restaurants.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-5xl mb-4">🍽️</p>
                <h2 className="text-xl font-bold text-[#1C1C1E] mb-2">No restaurants found</h2>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {restaurants.map((r) => (
                  <div key={r._id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={r.coverImage}
                      alt={r.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <span className="text-xs font-semibold text-[#00B37D]">{r.cuisine}</span>
                      <h3 className="font-bold text-[#1C1C1E] mt-1 truncate">{r.name}</h3>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{r.shortDescription}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">📍 {r.city}</span>
                        <span className="text-sm font-medium text-[#FF6B35]">{r.priceRange}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-sm font-medium">{r.averageRating}</span>
                        <span className="text-xs text-gray-400">({r.totalReviews} reviews)</span>
                      </div>
                      <Link
                        href={`/restaurants/${r._id}`}
                        className="mt-3 block text-center bg-[#00B37D] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#00a070] transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:border-[#00B37D] transition-colors"
                >
                  ← Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-[#00B37D] text-white"
                        : "border border-gray-200 hover:border-[#00B37D]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:border-[#00B37D] transition-colors"
                >
                  Next →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}