'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOfficers, createOfficer } from '@/lib/api/officers';
import { getUniversities } from '@/lib/api/universities';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/layout/PageHeader';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { Officer } from '@/lib/types';

export default function OfficersPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [staffCode, setStaffCode] = useState('');
  const [selectedUnivIds, setSelectedUnivIds] = useState<number[]>([]);

  const { data: officers, isLoading } = useQuery({
    queryKey: ['officers'],
    queryFn: () => getOfficers(),
  });

  const { data: universities } = useQuery({
    queryKey: ['universities'],
    queryFn: () => getUniversities(),
  });

  const mutation = useMutation({
    mutationFn: () =>
      createOfficer({
        userId: Number(userId),
        staffCode,
        universityIds: selectedUnivIds,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['officers'] });
      setOpen(false);
      setUserId('');
      setStaffCode('');
      setSelectedUnivIds([]);
    },
  });

  const toggleUniv = (id: number) => {
    setSelectedUnivIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'staffCode', header: 'Staff Code' },
    {
      key: 'managedUniversityIds',
      header: 'Universities',
      render: (o: Officer) => `${o.managedUniversityIds.length} managed`,
    },
  ];

  return (
    <div>
      <PageHeader title="Enrollment Officers" action={<Button onClick={() => setOpen(true)}>+ New Officer</Button>} />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Table columns={columns} data={officers?.content ?? []} keyExtractor={(o) => o.id} />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New Enrollment Officer">
        <div className="space-y-3">
          <Input
            label="User ID (existing STUDENT or PENDING user)"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            label="Staff Code"
            value={staffCode}
            onChange={(e) => setStaffCode(e.target.value)}
            placeholder="e.g. OFF-2024-001"
          />
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Managed Universities</label>
            <div className="space-y-1 max-h-40 overflow-y-auto border rounded-lg p-2">
              {universities?.content.map((u) => (
                <label key={u.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 rounded px-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedUnivIds.includes(u.id)}
                    onChange={() => toggleUniv(u.id)}
                  />
                  {u.name}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => mutation.mutate()}
              loading={mutation.isPending}
              disabled={!userId || !staffCode}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
