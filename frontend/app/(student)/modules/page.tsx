'use client';

import { useQuery } from '@tanstack/react-query';
import { getModules } from '@/lib/api/modules';
import Card from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';

export default function ModulesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(undefined, 0, 50),
  });

  return (
    <div>
      <PageHeader title="Modules" description="Browse all available modules and their exams." />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.content.map((m) => (
            <Link key={m.id} href={`/student/modules/${m.id}`}>
              <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                {m.coverImageUrl && (
                  <img src={m.coverImageUrl} alt={m.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                )}
                <p className="text-xs text-[#C2714F] font-medium mb-1">{m.semesterLabel}</p>
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                {m.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{m.description}</p>}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
