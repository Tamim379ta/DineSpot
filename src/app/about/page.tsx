import { FaUsers, FaUtensils, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const stats = [
  { icon: <FaUtensils />, value: "500+", label: "Restaurants" },
  { icon: <FaUsers />, value: "8K+", label: "Happy Diners" },
  { icon: <FaStar />, value: "4.8", label: "Average Rating" },
  { icon: <FaMapMarkerAlt />, value: "20+", label: "Cities" },
];

const team = [
  { name: "Arif Rahman", role: "CEO & Founder", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Nadia Hossain", role: "Head of Product", avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Karim Uddin", role: "Lead Developer", avatar: "https://i.pravatar.cc/150?img=13" },
  { name: "Tasnim Akter", role: "Head of Marketing", avatar: "https://i.pravatar.cc/150?img=14" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      {/* Hero */}
      <div className="bg-[#1C1C1E] py-20 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">About <span className="text-[#00B37D]">DineSpot</span></h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          We're on a mission to connect food lovers with the best dining experiences across Bangladesh.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#1C1C1E] mb-4">Our Mission</h2>
        <p className="text-gray-500 leading-relaxed text-lg">
          DineSpot was built to make discovering and booking restaurants effortless. Whether you're planning a romantic dinner, a family gathering, or a business lunch — we help you find the perfect spot and reserve your table in seconds. We believe every meal should be a memorable experience.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-[#00B37D] py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center text-white">
              <div className="text-3xl mb-2 flex justify-center">{s.icon}</div>
              <p className="text-4xl font-extrabold">{s.value}</p>
              <p className="text-green-100 mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#1C1C1E] text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="bg-white rounded-xl p-6 text-center shadow-sm">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
              <h3 className="font-bold text-[#1C1C1E] text-sm">{t.name}</h3>
              <p className="text-gray-400 text-xs mt-1">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}