"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    icon: "🔍",
    title: "Search",
    description: "Search restaurants by cuisine, location, or name and find your perfect match.",
  },
  {
    step: "02",
    icon: "🍽️",
    title: "Choose",
    description: "Browse menus, check ratings and reviews, and pick the restaurant you love.",
  },
  {
    step: "03",
    icon: "📅",
    title: "Book",
    description: "Select your date, time, and party size and confirm your reservation instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1C1C1E]">How It Works</h2>
          <p className="text-gray-500 mt-2">Book your table in 3 simple steps</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center">

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-dashed border-t-2 border-dashed border-[#00B37D] z-0" />
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center p-8"
              >
                {/* Circle Icon */}
                <div className="w-20 h-20 rounded-full bg-[#F0FAF6] border-2 border-[#00B37D] flex items-center justify-center text-4xl mb-4">
                  {item.icon}
                </div>

                <span className="text-sm font-bold text-[#00B37D] mb-2">STEP {item.step}</span>
                <h3 className="text-xl font-bold text-[#1C1C1E] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}