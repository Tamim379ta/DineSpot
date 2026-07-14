"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  restaurantName: string;
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  specialRequest: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-gray-100 text-gray-600",
};

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = async () => {
    if (!session?.user.id) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/diner?userId=${session.user.id}`
    );
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [session]);

  const handleCancel = async () => {
    if (!cancelId) return;
    setCancelling(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${cancelId}`, {
      method: "DELETE",
    });
    toast.error("Booking Cancelled");
    setCancelId(null);
    setCancelling(false);
    fetchBookings();
  };

  const cancellingBooking = bookings.find((b) => b._id === cancelId);

  return (
    <ProtectedRoute allowedRole="diner">
      <div className="min-h-screen bg-[#F7F7F7] py-12">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1C1C1E]">My Bookings</h1>
            <p className="text-gray-500 mt-1">Track and manage your table reservations</p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-24 animate-pulse" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">📅</p>
              <h2 className="text-xl font-bold text-[#1C1C1E] mb-2">No bookings yet</h2>
              <p className="text-gray-500 mb-6">Explore restaurants and book your first table</p>
              <Link
                href="/restaurants"
                className="bg-[#00B37D] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00a070] transition-colors"
              >
                Explore Restaurants
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b._id} className="bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-[#1C1C1E] text-lg">{b.restaurantName}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusStyles[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📅 {b.date}</span>
                      <span>🕐 {b.time}</span>
                      <span>👥 {b.partySize} {b.partySize === 1 ? "person" : "people"}</span>
                      {b.specialRequest && <span>💬 {b.specialRequest}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 shrink-0">
                    <Link
                      href={`/restaurants/${b.restaurantId}`}
                      className="text-sm font-semibold border border-[#00B37D] text-[#00B37D] px-4 py-2 rounded-lg hover:bg-[#F0FAF6] transition-colors"
                    >
                      View Restaurant
                    </Link>
                    {b.status === "pending" && (
                      <button
                        onClick={() => setCancelId(b._id)}
                        className="text-sm font-semibold border border-red-400 text-red-400 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-xl">🗓️</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1C1C1E]">Cancel Booking</h2>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            {cancellingBooking && (
              <div className="bg-[#F7F7F7] rounded-xl p-4 mb-6 text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-[#1C1C1E]">{cancellingBooking.restaurantName}</p>
                <p>📅 {cancellingBooking.date} &nbsp;🕐 {cancellingBooking.time}</p>
                <p>👥 {cancellingBooking.partySize} {cancellingBooking.partySize === 1 ? "person" : "people"}</p>
              </div>
            )}

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to cancel this reservation?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                disabled={cancelling}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}