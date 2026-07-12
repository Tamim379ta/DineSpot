"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Restaurants", icon: "🍽️" },
  { value: "20+", label: "Cities", icon: "🏙️" },
  { value: "10K+", label: "Bookings Made", icon: "📅" },
  { value: "8K+", label: "Happy Diners", icon: "😊" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#1C1C1E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-4xl mb-3">{stat.icon}</span>
              <span className="text-4xl font-extrabold text-[#00B37D]">{stat.value}</span>
              <span className="text-gray-400 mt-1 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}