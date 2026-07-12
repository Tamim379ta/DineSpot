"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

const cuisineOptions = [
  "Italian", "Chinese", "Indian", "Japanese", "Mexican",
  "American", "Thai", "Mediterranean", "Bengali", "French",
];

const amenityOptions = [
  "WiFi", "Parking", "Outdoor Seating", "Vegan Friendly",
  "Live Music", "Private Dining", "Bar", "Kids Friendly",
];

export default function AddRestaurantPage() {
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    cuisine: "",
    priceRange: "",
    city: "",
    address: "",
    phone: "",
    openTime: "",
    closeTime: "",
    coverImage: "",
    amenities: [] as string[],
  });
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    setForm((prev) => ({ ...prev, coverImage: data.data.url }));
    setImageUploading(false);
  };

  const handleSubmit = async () => {
    const { data: session } = await import("@/lib/auth-client").then(m => m.authClient.getSession());

    const payload = {
      ...form,
      ownerId: session?.user.id,
      ownerName: session?.user.name,
      openingHours: {
        open: form.openTime,
        close: form.closeTime,
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Restaurant added successfully! 🎉");
      router.push("/restaurants/manage");
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <ProtectedRoute allowedRole="owner">
      <div className="min-h-screen bg-[#F7F7F7] py-12">
        <div className="max-w-3xl mx-auto px-6">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1C1C1E]">Add Your Restaurant</h1>
            <p className="text-gray-500 mt-1">Fill in the details to list your restaurant on DineSpot</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">

            {/* Basic Info */}
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">Basic Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Restaurant Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
                />
                <input
                  type="text"
                  name="shortDescription"
                  placeholder="Short Description (max 150 characters)"
                  value={form.shortDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
                />
                <textarea
                  name="description"
                  placeholder="Full Description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">Restaurant Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="cuisine"
                  value={form.cuisine}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors text-gray-600"
                >
                  <option value="">Select Cuisine</option>
                  {cuisineOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  name="priceRange"
                  value={form.priceRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors text-gray-600"
                >
                  <option value="">Select Price Range</option>
                  <option value="$">$ — Budget</option>
                  <option value="$$">$$ — Moderate</option>
                  <option value="$$$">$$$ — Expensive</option>
                  <option value="$$$$">$$$$ — Fine Dining</option>
                </select>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={form.address}
                  onChange={handleChange}
                  className="md:col-span-2 w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
                />
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">Opening Hours</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Opening Time</label>
                  <input
                    type="time"
                    name="openTime"
                    value={form.openTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Closing Time</label>
                  <input
                    type="time"
                    name="closeTime"
                    value={form.closeTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#00B37D] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">Cover Image</h2>
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-[#00B37D] transition-colors">
                {imageUploading ? (
                  <p className="text-sm text-gray-400">Uploading...</p>
                ) : form.coverImage ? (
                  <img
                    src={form.coverImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-2xl mb-2">📷</p>
                    <p className="text-sm text-gray-400">Click to upload cover image</p>
                    <p className="text-xs text-gray-300 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${form.amenities.includes(amenity)
                      ? "border-[#00B37D] bg-[#F0FAF6] text-[#00B37D]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#00B37D] text-white font-semibold py-3 rounded-lg hover:bg-[#00a070] transition-colors"
            >
              Add Restaurant
            </button>

          </div>
        </div>
      </div>


    </ProtectedRoute>
  );
}