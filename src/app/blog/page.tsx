import Link from "next/link";

const blogs = [
  {
    slug: "top-10-restaurants-dhaka",
    title: "Top 10 Restaurants to Visit in Dhaka This Year",
    excerpt: "From fine dining to street food gems, we cover the best spots that Dhaka has to offer in 2025.",
    category: "Food Guide",
    date: "July 5, 2025",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
    author: "Arif Rahman",
  },
  {
    slug: "how-to-book-perfect-table",
    title: "How to Book the Perfect Table for Any Occasion",
    excerpt: "Whether it's a date night or a family dinner, here's how to make the most of your reservation.",
    category: "Tips & Tricks",
    date: "June 28, 2025",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600",
    author: "Nadia Hossain",
  },
  {
    slug: "rise-of-fine-dining-bangladesh",
    title: "The Rise of Fine Dining Culture in Bangladesh",
    excerpt: "Bangladesh's restaurant scene is evolving fast. Here's a look at how fine dining is taking over.",
    category: "Food Culture",
    date: "June 20, 2025",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    author: "Karim Uddin",
  },
  {
    slug: "best-cuisines-to-try",
    title: "5 Must-Try Cuisines if You're New to Dining Out",
    excerpt: "Not sure where to start? Here are five cuisines that are guaranteed to impress first-timers.",
    category: "Food Guide",
    date: "June 12, 2025",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600",
    author: "Tasnim Akter",
  },
  {
    slug: "restaurant-etiquette-guide",
    title: "The Complete Restaurant Etiquette Guide for 2025",
    excerpt: "From dress codes to tipping culture, here's everything you need to know before your next dinner.",
    category: "Tips & Tricks",
    date: "June 5, 2025",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
    author: "Arif Rahman",
  },
  {
    slug: "healthy-dining-options",
    title: "Healthy Dining: Finding Nutritious Options at Restaurants",
    excerpt: "Eating out doesn't have to mean unhealthy choices. Here's how to find the best healthy options.",
    category: "Food Culture",
    date: "May 28, 2025",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    author: "Nadia Hossain",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      {/* Hero */}
      <div className="bg-[#1C1C1E] py-20 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">Food <span className="text-[#00B37D]">Stories & Guides</span></h1>
        <p className="text-gray-400 text-lg">Tips, trends and tales from the dining world</p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <span className="text-xs font-semibold text-[#00B37D] uppercase tracking-wide">{blog.category}</span>
                <h3 className="font-bold text-[#1C1C1E] mt-2 mb-2 leading-snug">{blog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    <span>✍️ {blog.author}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.date}</span>
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-semibold text-[#00B37D] hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}