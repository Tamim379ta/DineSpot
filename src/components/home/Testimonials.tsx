"use client";

import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "Sarah Ahmed",
    location: "Dhaka",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "DineSpot made finding a great restaurant so easy! Booked a table at The Golden Fork and it was an amazing experience.",
  },
  {
    name: "Rafiq Hassan",
    location: "Chittagong",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "Super smooth booking experience. The restaurant suggestions were spot on and the whole process took less than 2 minutes!",
  },
  {
    name: "Nadia Islam",
    location: "Sylhet",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    comment: "Love the clean interface and how easy it is to filter by cuisine and location. Will definitely use DineSpot again!",
  },
  {
    name: "Karim Uddin",
    location: "Rajshahi",
    avatar: "https://i.pravatar.cc/150?img=7",
    rating: 5,
    comment: "Found an amazing Italian place through DineSpot. The booking was confirmed instantly and the table was ready when we arrived!",
  },
  {
    name: "Tasnim Akter",
    location: "Dhaka",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    comment: "I use DineSpot every weekend now. The filters make it so easy to find exactly what I'm craving. Absolutely love it!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#F7F7F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1C1C1E]">What Diners Say</h2>
          <p className="text-gray-500 mt-2">Real experiences from real people</p>
        </div>

      </div>

      {/* Marquee */}
      <Marquee speed={30} gradient={true} gradientColor="#F7F7F7" gradientWidth={100} pauseOnHover={true}>
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white p-6 rounded-xl shadow-sm mx-4 w-[320px]"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>

            {/* Comment */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {t.comment}
            </p>

            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#1C1C1E] text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">📍 {t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>

    </section>
  );
}