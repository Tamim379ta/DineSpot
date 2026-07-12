import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-[#00B37D] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#1C1C1E] mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-[#00B37D] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00a070] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/restaurants"
            className="border border-[#00B37D] text-[#00B37D] font-semibold px-6 py-3 rounded-lg hover:bg-[#F0FAF6] transition-colors"
          >
            Explore Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
}