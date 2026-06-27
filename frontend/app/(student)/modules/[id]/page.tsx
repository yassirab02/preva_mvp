'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getModule } from '@/lib/api/modules';
import { getExams } from '@/lib/api/exams';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { SkeletonCard } from '@/components/ui/Skeleton';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

export default function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const moduleId = Number(id);

  const { data: module } = useQuery({
    queryKey: ['module', moduleId],
    queryFn: () => getModule(moduleId),
  });

  const { data: exams, isLoading } = useQuery({
    queryKey: ['exams', moduleId],
    queryFn: () => getExams(moduleId),
    enabled: !!moduleId,
  });

  return (
    <div>
      <PageHeader
        title={module?.name ?? 'Module'}
        description={module?.description ?? undefined}
      />

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Exams</h2>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams?.content.map((exam) => (
            <Link key={exam.id} href={`/student/exams/${exam.id}`}>
              <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{exam.title}</p>
                    <p className="text-sm text-gray-500">{exam.year} • {exam.durationMinutes} min</p>
                    <p className="text-sm text-gray-500">{exam.totalPoints} pts — Pass at {exam.passingScore}%</p>
                  </div>
                  <Badge status={exam.status} />
                </div>
              </Card>
            </Link>
          ))}
          {exams?.content.length === 0 && (
            <p className="text-gray-400">No exams available yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
