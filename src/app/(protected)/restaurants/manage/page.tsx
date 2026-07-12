"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  city: string;
  priceRange: string;
  averageRating: number;
  coverImage: string;
  isActive: boolean;
  createdAt: string;
}

export default function ManageRestaurantsPage() {
  const { data: session } = useSession();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    if (!session?.user.id) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/owner?ownerId=${session.user.id}`
    );
    const data = await res.json();
    setRestaurants(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRestaurants();
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this restaurant?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${id}`, {
      method: "DELETE",
    });
    fetchRestaurants();
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1C1C1E]">My Restaurants</h1>
            <p className="text-gray-500 mt-1">Manage your restaurant listings</p>
          </div>
          <Link
            href="/restaurants/add"
            className="bg-[#00B37D] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#00a070] transition-colors text-sm"
          >
            + Add Restaurant
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🍽️</p>
            <h2 className="text-xl font-bold text-[#1C1C1E] mb-2">No restaurants yet</h2>
            <p className="text-gray-500 mb-6">Add your first restaurant to get started</p>
            <Link
              href="/restaurants/add"
              className="bg-[#00B37D] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00a070] transition-colors"
            >
              Add Restaurant
            </Link>
          </div>
        ) : (
          /* Restaurant Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <div key={r._id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                {/* Image */}
                <img
                  src={r.coverImage}
                  alt={r.name}
                  className="w-full h-44 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-[#1C1C1E]">{r.name}</h3>
                    <span className="text-xs font-medium text-[#FF6B35]">{r.priceRange}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span>🍴 {r.cuisine}</span>
                    <span>📍 {r.city}</span>
                    <span>⭐ {r.averageRating}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/restaurants/${r._id}`}
                      className="flex-1 text-center text-sm font-semibold border border-[#00B37D] text-[#00B37D] py-2 rounded-lg hover:bg-[#F0FAF6] transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="flex-1 text-sm font-semibold border border-red-400 text-red-400 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}