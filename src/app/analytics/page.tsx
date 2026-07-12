"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

const COLORS = ["#00B37D", "#FF6B35", "#1C1C1E", "#00a070", "#ff8c5a"];

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [restaurants, setRestaurants] = useState<{ name: string; averageRating: number; totalReviews: number }[]>([]);
  const [bookings, setBookings] = useState<{ restaurantName: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user.id) return;

      const restRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/owner?ownerId=${session.user.id}`
      );
      const restData = await restRes.json();
      setRestaurants(restData);

      const allBookings = await Promise.all(
        restData.map((r: { _id: string }) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/restaurant/${r._id}`)
            .then((res) => res.json())
        )
      );

      setBookings(allBookings.flat());
      setLoading(false);
    };
    fetchData();
  }, [session]);

  const bookingsPerRestaurant = restaurants.map((r) => ({
    name: r.name.length > 12 ? r.name.slice(0, 12) + "..." : r.name,
    bookings: bookings.filter((b) => b.restaurantName === r.name).length,
  }));

  const ratingData = restaurants.map((r) => ({
    name: r.name.length > 12 ? r.name.slice(0, 12) + "..." : r.name,
    value: r.averageRating || 0,
  }));

  const reviewsData = restaurants.map((r) => ({
    name: r.name.length > 12 ? r.name.slice(0, 12) + "..." : r.name,
    reviews: r.totalReviews,
  }));

  return (
    <ProtectedRoute allowedRole="owner">
      {loading ? (
        <div className="min-h-screen bg-[#F7F7F7] py-12">
          <div className="max-w-6xl mx-auto px-6 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="grid grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="h-72 bg-white rounded-xl animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-[#F7F7F7] py-12">
          <div className="max-w-6xl mx-auto px-6">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#1C1C1E]">Analytics</h1>
              <p className="text-gray-500 mt-1">Overview of your restaurant performance</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Total Restaurants</p>
                <p className="text-4xl font-extrabold text-[#00B37D]">{restaurants.length}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                <p className="text-4xl font-extrabold text-[#FF6B35]">{bookings.length}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Total Reviews</p>
                <p className="text-4xl font-extrabold text-[#1C1C1E]">
                  {restaurants.reduce((sum, r) => sum + r.totalReviews, 0)}
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Bookings per Restaurant */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-bold text-[#1C1C1E] mb-6">Bookings per Restaurant</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={bookingsPerRestaurant}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#00B37D" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Average Ratings */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-bold text-[#1C1C1E] mb-6">Average Ratings</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ratingData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
                    <Tooltip formatter={(value) => [`${value} ⭐`, "Rating"]} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {ratingData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Reviews per Restaurant */}
              <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
                <h2 className="font-bold text-[#1C1C1E] mb-6">Reviews per Restaurant</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={reviewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="reviews" fill="#FF6B35" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}