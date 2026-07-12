"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  city: string;
  address: string;
  phone: string;
  priceRange: string;
  averageRating: number;
  totalReviews: number;
  coverImage: string;
  description: string;
  shortDescription: string;
  amenities: string[];
  openingHours: { open: string; close: string };
  ownerId: string;
}

export default function RestaurantDetailsPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${id}`);
      const data = await res.json();
      setRestaurant(data);
      setLoading(false);
    };
    fetch_();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] animate-pulse">
        <div className="w-full h-80 bg-gray-200" />
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      {/* Hero Image */}
      <div className="w-full h-80 relative">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6">
          <span className="bg-[#00B37D] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {restaurant.cuisine}
          </span>
          <h1 className="text-4xl font-extrabold text-white mt-2">{restaurant.name}</h1>
          <p className="text-gray-200 mt-1">{restaurant.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Main Info */}
        <div className="lg:col-span-2 space-y-8">

          {/* Quick Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#00B37D]">{restaurant.averageRating || "N/A"}</p>
              <p className="text-xs text-gray-500 mt-1">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1C1C1E]">{restaurant.totalReviews}</p>
              <p className="text-xs text-gray-500 mt-1">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#FF6B35]">{restaurant.priceRange}</p>
              <p className="text-xs text-gray-500 mt-1">Price Range</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1C1C1E]">📍</p>
              <p className="text-xs text-gray-500 mt-1">{restaurant.city}</p>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1C1C1E] mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
          </div>

          {/* Amenities */}
          {restaurant.amenities?.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1C1C1E] mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {restaurant.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-4 py-2 bg-[#F0FAF6] text-[#00B37D] text-sm font-medium rounded-lg border border-[#00B37D]"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1C1C1E] mb-3">Location</h2>
            <p className="text-gray-600">📍 {restaurant.address}</p>
            <p className="text-gray-600 mt-1">📞 {restaurant.phone}</p>
          </div>

        </div>

        {/* Right — Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-[#1C1C1E] mb-1">Book a Table</h2>
            <p className="text-sm text-gray-500 mb-5">Reserve your spot now</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Party Size</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]">
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Special Request</label>
                <textarea
                  rows={3}
                  placeholder="Any special requests?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] resize-none"
                />
              </div>
              <button className="w-full bg-[#00B37D] text-white font-semibold py-3 rounded-lg hover:bg-[#00a070] transition-colors">
                Book Now
              </button>

              {/* Opening Hours */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <p className="text-xs font-semibold text-gray-600 mb-1">Opening Hours</p>
                <p className="text-sm text-gray-500">
                  🕐 {restaurant.openingHours?.open} — {restaurant.openingHours?.close}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}