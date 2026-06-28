'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { ApiResponse, PageResponse, Student } from '@/lib/types';
import Table from '@/components/ui/Table';
import PageHeader from '@/components/layout/PageHeader';
import { SkeletonTable } from '@/components/ui/Skeleton';
import Link from 'next/link';
import Button from '@/components/ui/Button';

async function getStudents(): Promise<PageResponse<Student>> {
  const res = await apiClient.get<ApiResponse<PageResponse<Student>>>('/api/students');
  return res.data.data;
}

export default function StudentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'universityName', header: 'University', render: (s: Student) => s.universityName ?? s.requestedUniversity ?? '—' },
    { key: 'majorName', header: 'Major', render: (s: Student) => s.majorName ?? s.requestedMajor ?? '—' },
    {
      key: 'actions',
      header: '',
      render: (s: Student) => (
        <Link href={`/admin/students/${s.id}`}>
          <Button size="sm" variant="ghost">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Students" />
      {isLoading ? <SkeletonTable /> : (
        <Table columns={columns} data={data?.content ?? []} keyExtractor={(s) => s.id} />
      )}
    </div>
  );
}
