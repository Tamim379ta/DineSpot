"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Image from "next/image";
import toast from "react-hot-toast";

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
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${deleteId}`, {
      method: "DELETE",
    });
    toast.success("Restaurant deleted");
    setDeleteId(null);
    setDeleting(false);
    fetchRestaurants();
  };

  const deletingRestaurant = restaurants.find((r) => r._id === deleteId);

  return (
    <ProtectedRoute allowedRole="owner">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((r) => (
                <div key={r._id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={r.coverImage}
                    alt={r.name}
                    width={50}
                    height={50}
                    className="w-full h-44 object-cover"
                  />
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
                    <div className="flex gap-2">
                      <Link
                        href={`/restaurants/${r._id}`}
                        className="flex-1 text-center text-sm font-semibold border border-[#00B37D] text-[#00B37D] py-2 rounded-lg hover:bg-[#F0FAF6] transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => setDeleteId(r._id)}
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-xl">🗑️</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1C1C1E]">Delete Restaurant</h2>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            {deletingRestaurant && (
              <div className="bg-[#F7F7F7] rounded-xl p-4 mb-6 flex items-center gap-3">
                <Image
                  src={deletingRestaurant.coverImage}
                  alt={deletingRestaurant.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="text-sm">
                  <p className="font-semibold text-[#1C1C1E]">{deletingRestaurant.name}</p>
                  <p className="text-gray-500">🍴 {deletingRestaurant.cuisine} &nbsp;📍 {deletingRestaurant.city}</p>
                  <p className="text-gray-500">⭐ {deletingRestaurant.averageRating} &nbsp;{deletingRestaurant.priceRange}</p>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to permanently delete this restaurant? All associated data will be removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Keep It
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>

          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}