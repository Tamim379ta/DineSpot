"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";


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
  const router = useRouter();
  const { data: session } = useSession();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    partySize: "2",
    specialRequest: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reviews, setReviews] = useState<{
    _id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewLoading, setReviewLoading] = useState(false);

  const fetchReviews = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${id}`);
      const data = await res.json();
      setRestaurant(data);
      setLoading(false);
    };
    fetchRestaurant();
    fetchReviews();
  }, [id]);
  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${id}`);
      const data = await res.json();
      setRestaurant(data);
      setLoading(false);
    };
    fetchRestaurant();
  }, [id]);

  const handleReview = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!reviewForm.comment) {
      alert("Please write a comment");
      return;
    }
    setReviewLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        userName: session.user.name,
        restaurantId: id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      }),
    });
    setReviewLoading(false);
    setReviewForm({ rating: 5, comment: "" });
    fetchReviews();
  };

  const handleBooking = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (!booking.date || !booking.time) {
      alert("Please select date and time");
      return;
    }

    setBookingLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        userName: session.user.name,
        restaurantId: restaurant?._id,
        restaurantName: restaurant?.name,
        date: booking.date,
        time: booking.time,
        partySize: parseInt(booking.partySize),
        specialRequest: booking.specialRequest,
      }),
    });

    setBookingLoading(false);

    if (res.ok) {
      toast.success("Booking Sent Successfully")
      setBookingSuccess(true);
    } else {
      toast.error("Failed to book. Please try again.")
    }
  };

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
        <Image
          src={restaurant.coverImage}
          alt={restaurant.name}
          width={1000}
          height={500}
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

            {bookingSuccess ? (
              <div className="text-center py-8">
                <p className="text-5xl mb-3">🎉</p>
                <h3 className="font-bold text-[#1C1C1E] text-lg mb-1">Booking Confirmed!</h3>
                <p className="text-gray-500 text-sm mb-4">Your table has been reserved successfully.</p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="text-sm text-[#00B37D] font-semibold hover:underline"
                >
                  Make another booking
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Date</label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Time</label>
                  <input
                    type="time"
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Party Size</label>
                  <select
                    value={booking.partySize}
                    onChange={(e) => setBooking({ ...booking, partySize: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Special Request</label>
                  <textarea
                    rows={3}
                    placeholder="Any special requests?"
                    value={booking.specialRequest}
                    onChange={(e) => setBooking({ ...booking, specialRequest: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] resize-none"
                  />
                </div>
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full bg-[#00B37D] text-white font-semibold py-3 rounded-lg hover:bg-[#00a070] transition-colors disabled:opacity-50"
                >
                  {bookingLoading ? "Booking..." : session ? "Book Now" : "Login to Book"}
                </button>

                {/* Opening Hours */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Opening Hours</p>
                  <p className="text-sm text-gray-500">
                    🕐 {restaurant.openingHours?.open} — {restaurant.openingHours?.close}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      {/* Reviews */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1C1C1E] mb-6">
          Reviews ({reviews.length})
        </h2>

        {/* Review Form */}
        {session && (session.user as { role?: string })?.role === "diner" && (
          <div className="mb-8 p-4 bg-[#F7F7F7] rounded-xl">
            <h3 className="font-semibold text-[#1C1C1E] mb-3">Leave a Review</h3>

            {/* Star Rating */}
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  className={`text-2xl transition-colors ${star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                >
                  ⭐
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              placeholder="Share your experience..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] resize-none mb-3"
            />
            <button
              onClick={handleReview}
              disabled={reviewLoading}
              className="bg-[#00B37D] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#00a070] transition-colors text-sm disabled:opacity-50"
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-2">💬</p>
            <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00B37D] flex items-center justify-center text-white text-xs font-bold">
                      {r.userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-sm text-[#1C1C1E]">{r.userName}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${star <= r.rating ? "text-yellow-400" : "text-gray-200"}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}