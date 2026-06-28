'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function StudentNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name ?? '';

  const links = [
    { href: '/student/dashboard', label: 'Tableau de bord' },
    { href: '/student/modules', label: 'Modules' },
    { href: '/student/profile', label: 'Profil' },
  ];

  return (
    <nav className="bg-[#1E1B4B] border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-14">
        <Link href="/student/dashboard" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#C2714F] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
              <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white">Préva</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="w-px h-4 bg-white/15 mx-1" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#C2714F]/20 border border-[#C2714F]/30 flex items-center justify-center text-[10px] font-bold text-[#C2714F]">
              {userName.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
