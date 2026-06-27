'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRegistrations, approveRegistration, rejectRegistration } from '@/lib/api/registrations';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import Modal from '@/components/ui/Modal';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { RegistrationRequest } from '@/lib/types';

export default function RegistrationsPage() {
  const qc = useQueryClient();
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['registrations'],
    queryFn: () => getRegistrations(),
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => approveRegistration(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['registrations'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectRegistration(rejectId!, rejectReason),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['registrations'] }); setRejectId(null); setRejectReason(''); },
  });

  const columns = [
    { key: 'studentName', header: 'Student' },
    { key: 'requestedUniversity', header: 'University' },
    { key: 'requestedMajor', header: 'Major' },
    { key: 'status', header: 'Status', render: (r: RegistrationRequest) => <Badge status={r.status} /> },
    { key: 'submittedAt', header: 'Submitted', render: (r: RegistrationRequest) => new Date(r.submittedAt).toLocaleDateString() },
    {
      key: 'actions',
      header: '',
      render: (r: RegistrationRequest) =>
        r.status === 'PENDING' ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => approveMutation.mutate(r.id)} loading={approveMutation.isPending}>Approve</Button>
            <Button size="sm" variant="danger" onClick={() => setRejectId(r.id)}>Reject</Button>
          </div>
        ) : null,
    },
  ];

  return (
    <div>
      <PageHeader title="Registration Requests" />
      {isLoading ? <SkeletonTable /> : (
        <Table columns={columns} data={data?.content ?? []} keyExtractor={(r) => r.id} />
      )}

      <Modal open={!!rejectId} onClose={() => setRejectId(null)} title="Reject Registration">
        <div className="space-y-4">
          <textarea
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent resize-none"
            placeholder="Reason for rejection..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setRejectId(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => rejectMutation.mutate()} loading={rejectMutation.isPending} disabled={!rejectReason.trim()}>
              Reject
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
