'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function StudentNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: '/student/dashboard', label: 'Dashboard' },
    { href: '/student/modules', label: 'Modules' },
    { href: '/student/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-[#1E1B4B] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/student/dashboard" className="text-xl font-bold text-[#C2714F]">
          Préva
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname.startsWith(link.href)
                  ? 'text-white font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="text-sm text-gray-300 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
