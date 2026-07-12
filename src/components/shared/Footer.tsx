import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";



export default function Footer() {
  return (
    <footer className="bg-[#1C1C1E] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#00B37D] mb-3">🍽️ DineSpot</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Discover the best restaurants around you and book your table in seconds.
            </p>

            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/restaurants" className="hover:text-white transition-colors">Restaurants</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Owners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register" className="hover:text-white transition-colors">List Your Restaurant</Link></li>
              <li><Link href="/restaurants/manage" className="hover:text-white transition-colors">Manage Listings</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 support@dinespot.com</li>
              <li>📞 +880 1700-000000</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© 2025 DineSpot. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}