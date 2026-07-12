import Link from "next/link";

const blogs: Record<string, {
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content: string;
}> = {
  "top-10-restaurants-dhaka": {
    title: "Top 10 Restaurants to Visit in Dhaka This Year",
    category: "Food Guide",
    date: "July 5, 2025",
    author: "Arif Rahman",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    content: `Dhaka's food scene has never been more exciting. From rooftop dining to hidden gems tucked in narrow lanes, the city is full of culinary surprises waiting to be discovered.

Whether you're a local foodie or a visitor exploring Bangladesh's capital, this guide covers the must-visit restaurants that are setting the standard for dining in 2025.

From authentic Bengali cuisine to international flavors, Dhaka has something for every palate and budget. The city's restaurant culture has matured significantly over the past few years, with chefs experimenting with fusion dishes and farm-to-table concepts gaining popularity.

Fine dining establishments are now competing with casual bistros and themed restaurants, creating a vibrant ecosystem that caters to all tastes. Whether you prefer a quiet intimate setting or a lively atmosphere with live music, Dhaka's restaurant scene has you covered.

Make sure to explore neighborhoods like Gulshan, Banani, and Dhanmondi for the highest concentration of quality dining options. And don't forget to try the street food — some of the city's most memorable meals happen at roadside stalls!`,
  },
  "how-to-book-perfect-table": {
    title: "How to Book the Perfect Table for Any Occasion",
    category: "Tips & Tricks",
    date: "June 28, 2025",
    author: "Nadia Hossain",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
    content: `Booking the right table can make or break your dining experience. Whether it's a romantic anniversary dinner or a corporate lunch, a little planning goes a long way.

Start by considering the occasion. A birthday celebration calls for a festive atmosphere, while a business meeting demands a quieter setting where conversation flows easily.

Always book in advance, especially for weekends and holidays. Popular restaurants fill up quickly, and last-minute bookings often result in less desirable seating arrangements.

When making your reservation, don't hesitate to mention special requirements — dietary restrictions, accessibility needs, or a preference for window seating. Good restaurants accommodate these requests willingly.

Finally, confirm your booking 24 hours before and arrive on time. Respecting the restaurant's schedule ensures a smooth experience for everyone involved.`,
  },
  "rise-of-fine-dining-bangladesh": {
    title: "The Rise of Fine Dining Culture in Bangladesh",
    category: "Food Culture",
    date: "June 20, 2025",
    author: "Karim Uddin",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
    content: `Bangladesh's culinary landscape is undergoing a remarkable transformation. Fine dining, once considered an imported concept, has now firmly taken root in Dhaka and other major cities.

A new generation of chefs trained in international culinary schools are returning home with fresh ideas, blending traditional Bengali flavors with global techniques. The result is an exciting fusion cuisine that feels both familiar and innovative.

Upscale restaurants are investing heavily in ambiance, service quality, and curated wine lists, raising the bar for the entire industry. This shift is being driven by a growing middle class with disposable income and a desire for premium experiences.

Social media has played a crucial role in this transformation — beautifully plated dishes get shared widely, creating buzz and drawing curious diners. Food photography has become an art form in itself, and restaurants are designing dishes with visual appeal in mind.

The future of fine dining in Bangladesh looks bright, with more culinary schools, food festivals, and international collaborations on the horizon.`,
  },
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs[slug];
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">📄</p>
          <h2 className="text-xl font-bold text-[#1C1C1E] mb-2">Blog post not found</h2>
          <Link href="/blog" className="text-[#00B37D] font-semibold hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      {/* Hero Image */}
      <div className="w-full h-80 relative">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-6 left-0 right-0 max-w-3xl mx-auto px-6">
          <span className="bg-[#00B37D] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-3 leading-snug">{blog.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-200">
          <span>✍️ {blog.author}</span>
          <span>•</span>
          <span>📅 {blog.date}</span>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {blog.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-gray-600 leading-relaxed text-base">
              {para}
            </p>
          ))}
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-[#00B37D] font-semibold hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>

      </div>
    </div>
  );
}