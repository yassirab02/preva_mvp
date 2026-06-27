'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUniversities, deleteUniversity } from '@/lib/api/universities';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { SkeletonTable } from '@/components/ui/Skeleton';
import Link from 'next/link';
import { useState } from 'react';
import { University } from '@/lib/types';

export default function UniversitiesPage() {
  const qc = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['universities'],
    queryFn: () => getUniversities(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUniversity(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['universities'] }); setDeleteId(null); },
  });

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'city', header: 'City' },
    { key: 'country', header: 'Country' },
    {
      key: 'isActive',
      header: 'Status',
      render: (u: University) => <Badge status={u.isActive ? 'ACTIVE' : 'SUSPENDED'} />,
    },
    {
      key: 'actions',
      header: '',
      render: (u: University) => (
        <div className="flex gap-2">
          <Link href={`/admin/universities/${u.id}/edit`}>
            <Button variant="ghost" size="sm">Edit</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => setDeleteId(u.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Universities"
        action={<Link href="/admin/universities/new"><Button>+ New</Button></Link>}
      />
      {isLoading ? <SkeletonTable /> : (
        <Table columns={columns} data={data?.content ?? []} keyExtractor={(u) => u.id} />
      )}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete University"
        message="Are you sure you want to deactivate this university?"
        confirmLabel="Deactivate"
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
