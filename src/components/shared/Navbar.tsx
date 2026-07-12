"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const dinerLinks = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const ownerLinks = [
  { label: "Home", href: "/" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "My Restaurants", href: "/restaurants/manage" },
  { label: "Add Restaurant", href: "/restaurants/add" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const role = (session?.user as { role?: string })?.role;

  const navLinks =
    !session ? publicLinks :
    role === "owner" ? ownerLinks :
    dinerLinks;

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="w-full bg-[#1C1C1E] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#00B37D]">
          🍽️ DineSpot
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#00B37D]"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-sm text-gray-300">
                👋 {session.user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold bg-[#00B37D] text-white px-4 py-2 rounded-lg hover:bg-[#00a070] transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}