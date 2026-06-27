'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getMySessions } from '@/lib/api/sessions';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { SkeletonCard } from '@/components/ui/Skeleton';
import Link from 'next/link';

export default function StudentDashboard() {
  const { data: session } = useSession();
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['my-sessions'],
    queryFn: () => getMySessions(0, 5),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1E1B4B]">
          Bonjour, {session?.user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">Continuez à vous entraîner pour réussir vos examens.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/student/modules">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-gray-900">Browse Modules</h3>
            <p className="text-sm text-gray-500 mt-1">Find exams by module</p>
          </Card>
        </Link>
        <Card>
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900">
            {sessions?.totalElements ?? '—'} Sessions
          </h3>
          <p className="text-sm text-gray-500 mt-1">Total exams taken</p>
        </Card>
        <Card>
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-semibold text-gray-900">Keep Going</h3>
          <p className="text-sm text-gray-500 mt-1">Practice makes perfect</p>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h2>
        {isLoading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : sessions?.content.length === 0 ? (
          <Card>
            <p className="text-gray-400 text-center py-4">No sessions yet. Start your first exam!</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {sessions?.content.map((s) => (
              <Link key={s.id} href={`/student/exams/${s.examId}/results/${s.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{s.examTitle}</p>
                      <p className="text-sm text-gray-500">{new Date(s.startedAt).toLocaleDateString('fr-MA')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {s.percentageScore !== null && (
                        <span className="text-lg font-bold text-[#1E1B4B]">
                          {s.percentageScore?.toFixed(0)}%
                        </span>
                      )}
                      <Badge status={s.status} />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
