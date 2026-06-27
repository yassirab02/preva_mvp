'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/universities', label: 'Universities', icon: '🏛️' },
  { href: '/admin/majors', label: 'Majors', icon: '📚' },
  { href: '/admin/semesters', label: 'Semesters', icon: '📅' },
  { href: '/admin/modules', label: 'Modules', icon: '📖' },
  { href: '/admin/exams', label: 'Exams', icon: '📝' },
  { href: '/admin/registrations', label: 'Registrations', icon: '📋' },
  { href: '/admin/students', label: 'Students', icon: '🎓' },
  { href: '/admin/officers', label: 'Officers', icon: '👤', adminOnly: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session as any)?.role;

  return (
    <aside className="w-64 min-h-screen bg-[#0F0E1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-[#C2714F]">Préva</h1>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>

      {role === 'OFFICER' && (
        <div className="mx-4 mt-3 px-3 py-2 bg-blue-900/30 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-300">Showing results for your universities</p>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1">
        {adminLinks
          .filter((link) => !link.adminOnly || role === 'ADMIN')
          .map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-[#1E1B4B] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-400 mb-2">{(session?.user as any)?.name}</div>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Sign out →
        </button>
      </div>
    </aside>
  );
}
