'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExams, publishExam, archiveExam } from '@/lib/api/exams';
import { getModules } from '@/lib/api/modules';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import { SkeletonTable } from '@/components/ui/Skeleton';
import Link from 'next/link';
import { Exam } from '@/lib/types';

export default function ExamsPage() {
  const [moduleId, setModuleId] = useState<number | null>(null);
  const qc = useQueryClient();

  const { data: modules } = useQuery({ queryKey: ['modules-all'], queryFn: () => getModules() });
  const { data: exams, isLoading } = useQuery({
    queryKey: ['exams', moduleId],
    queryFn: () => getExams(moduleId ?? 0),
    enabled: !!moduleId,
  });

  const publishMutation = useMutation({
    mutationFn: (id: number) => publishExam(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['exams'] }),
  });

  const archiveMutation = useMutation({
    mutationFn: (id: number) => archiveExam(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['exams'] }),
  });

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'year', header: 'Year' },
    { key: 'durationMinutes', header: 'Duration', render: (e: Exam) => `${e.durationMinutes} min` },
    { key: 'status', header: 'Status', render: (e: Exam) => <Badge status={e.status} /> },
    {
      key: 'actions',
      header: '',
      render: (e: Exam) => (
        <div className="flex gap-2">
          <Link href={`/admin/exams/${e.id}/edit`}><Button size="sm" variant="ghost">Edit</Button></Link>
          <Link href={`/admin/exams/${e.id}/questions`}><Button size="sm" variant="ghost">Questions</Button></Link>
          {e.status === 'DRAFT' && <Button size="sm" onClick={() => publishMutation.mutate(e.id)}>Publish</Button>}
          {e.status === 'PUBLISHED' && <Button size="sm" variant="danger" onClick={() => archiveMutation.mutate(e.id)}>Archive</Button>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Exams" action={<Link href="/admin/exams/new"><Button>+ New Exam</Button></Link>} />

      <div className="flex gap-3 items-center">
        <label className="text-sm text-gray-600">Filter by module:</label>
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          value={moduleId ?? ''}
          onChange={(e) => setModuleId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Select module...</option>
          {modules?.content.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {!moduleId ? (
        <p className="text-gray-400 text-sm">Select a module to view its exams.</p>
      ) : isLoading ? (
        <SkeletonTable />
      ) : (
        <Table columns={columns} data={exams?.content ?? []} keyExtractor={(e) => e.id} />
      )}
    </div>
  );
}
