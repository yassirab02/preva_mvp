'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getModules, createModule } from '@/lib/api/modules';
import { getSemesters } from '@/lib/api/semesters';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/layout/PageHeader';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { Module } from '@/lib/types';

export default function ModulesPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('1');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [semesterId, setSemesterId] = useState('');

  const { data: modules, isLoading } = useQuery({
    queryKey: ['modules'],
    queryFn: () => getModules(),
  });

  const { data: semesters } = useQuery({
    queryKey: ['semesters'],
    queryFn: () => getSemesters(),
  });

  const mutation = useMutation({
    mutationFn: () =>
      createModule({
        name,
        description: description || undefined,
        order: Number(order),
        coverImageUrl: coverImageUrl || undefined,
        semesterId: Number(semesterId),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['modules'] });
      setOpen(false);
      setName('');
      setDescription('');
      setOrder('1');
      setCoverImageUrl('');
      setSemesterId('');
    },
  });

  const columns = [
    { key: 'order', header: '#', render: (m: Module) => m.order },
    { key: 'name', header: 'Name' },
    { key: 'semesterLabel', header: 'Semester' },
    { key: 'description', header: 'Description', render: (m: Module) => m.description ?? '—' },
  ];

  return (
    <div>
      <PageHeader title="Modules" action={<Button onClick={() => setOpen(true)}>+ New</Button>} />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Table columns={columns} data={modules?.content ?? []} keyExtractor={(m) => m.id} />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New Module">
        <div className="space-y-3">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Order"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
          <Input
            label="Cover Image URL (optional)"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
          />
          <div>
            <label className="text-sm font-medium text-gray-700">Semester</label>
            <select
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
            >
              <option value="">Select semester...</option>
              {semesters?.content.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} — {s.majorName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => mutation.mutate()}
              loading={mutation.isPending}
              disabled={!name || !semesterId}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
