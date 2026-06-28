'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getModules } from '@/lib/api/modules';
import { getMySessions } from '@/lib/api/sessions';
import Link from 'next/link';

const moduleColors = [
  { bg: 'bg-[#1E1B4B]/8', text: 'text-[#1E1B4B]', bar: 'bg-[#1E1B4B]' },
  { bg: 'bg-[#C2714F]/10', text: 'text-[#C2714F]', bar: 'bg-[#C2714F]' },
  { bg: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-500' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-500' },
  { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-500' },
  { bg: 'bg-purple-100', text: 'text-purple-700', bar: 'bg-purple-500' },
];

export default function StudentDashboard() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] ?? 'there';

  const { data: modules } = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(0, 6),
  });

  const { data: sessions } = useQuery({
    queryKey: ['my-sessions'],
    queryFn: () => getMySessions(0, 20),
  });

  const totalExams = sessions?.totalElements ?? 0;
  const avgScore = sessions?.content?.length
    ? Math.round(sessions.content.filter((s: any) => s.percentageScore != null).reduce((acc: number, s: any) => acc + (s.percentageScore ?? 0), 0) / Math.max(sessions.content.filter((s: any) => s.percentageScore != null).length, 1))
    : 0;

  return (
    <div className="p-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-semibold text-[#1E1B4B]/50">My modules</h2>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C2714F]/10 text-xs font-semibold text-[#C2714F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2714F]" />
            7-day streak
          </span>
          <span className="px-3 py-1.5 rounded-full bg-[#1E1B4B]/8 text-xs font-semibold text-[#1E1B4B]">
            2,450 XP
          </span>
        </div>
      </div>

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E1B4B] mb-1">Welcome back, {firstName}</h1>
        <p className="text-sm text-[#1E1B4B]/50">SMI · Semestre 2 · Université Mohammed V — pick a module to start practicing.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Current streak', value: '7 days' },
          { label: 'Total XP', value: '2,450' },
          { label: 'Faculty rank', value: '#3' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#E8E2D9] p-5">
            <p className="text-xs text-[#1E1B4B]/45 mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-[#1E1B4B]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#1E1B4B]">Your modules</h2>
        {modules && <span className="text-xs text-[#1E1B4B]/40">{modules.totalElements} modules</span>}
      </div>

      {!modules || modules.content.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { code: 'MATH-202', name: 'Analyse 2', cat: 'Mathématiques · S2', pct: 72, colorIdx: 0 },
            { code: 'MATH-301', name: 'Algèbre 3', cat: 'Mathématiques · S2', pct: 40, colorIdx: 1 },
            { code: 'MATH-204', name: 'Probabilités', cat: 'Mathématiques · S2', pct: 55, colorIdx: 2 },
            { code: 'PHYS-202', name: 'Physique 2', cat: 'Physique · S2', pct: 28, colorIdx: 3 },
            { code: 'INFO-101', name: 'Informatique 1', cat: 'Informatique · S2', pct: 60, colorIdx: 4 },
            { code: 'ELEC-201', name: 'Électronique', cat: 'Génie · S2', pct: 15, colorIdx: 5 },
          ].map((mod) => {
            const c = moduleColors[mod.colorIdx];
            return (
              <Link href="/student/modules" key={mod.code}>
                <div className="bg-white rounded-2xl border border-[#E8E2D9] p-5 hover:shadow-md hover:border-[#E8E2D9]/80 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`w-4.5 h-4.5 ${c.text}`}>
                        <path d="M6 4h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="14 4 14 8 18 8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-[#1E1B4B]/35">{mod.code}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1B4B] mb-0.5 group-hover:text-[#C2714F] transition-colors">{mod.name}</h3>
                  <p className="text-xs text-[#1E1B4B]/45 mb-4">{mod.cat}</p>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-[#1E1B4B]/40">Progress</span>
                      <span className={`text-[10px] font-bold ${c.text}`}>{mod.pct}%</span>
                    </div>
                    <div className="h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
                      <div className={`h-full ${c.bar} rounded-full transition-all`} style={{ width: `${mod.pct}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.content.map((mod: any, i: number) => {
            const c = moduleColors[i % moduleColors.length];
            return (
              <Link href={`/student/modules/${mod.id}`} key={mod.id}>
                <div className="bg-white rounded-2xl border border-[#E8E2D9] p-5 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`w-4.5 h-4.5 ${c.text}`}>
                        <path d="M6 4h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="14 4 14 8 18 8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-semibold text-[#1E1B4B]/35">{mod.code ?? `MOD-${mod.id}`}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1B4B] mb-0.5 group-hover:text-[#C2714F] transition-colors">{mod.name}</h3>
                  <p className="text-xs text-[#1E1B4B]/45 mb-4">{mod.semesterName ?? ''}</p>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-[#1E1B4B]/40">Progress</span>
                      <span className={`text-[10px] font-bold ${c.text}`}>0%</span>
                    </div>
                    <div className="h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
                      <div className={`h-full ${c.bar} rounded-full`} style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
