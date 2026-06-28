'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSemesters, createSemester } from '@/lib/api/semesters';
import { getMajors } from '@/lib/api/majors';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/layout/PageHeader';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { Semester } from '@/lib/types';

export default function SemestersPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState('1');
  const [label, setLabel] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [majorId, setMajorId] = useState('');

  const { data: semesters, isLoading } = useQuery({
    queryKey: ['semesters'],
    queryFn: () => getSemesters(),
  });

  const { data: majors } = useQuery({
    queryKey: ['majors'],
    queryFn: () => getMajors(),
  });

  const mutation = useMutation({
    mutationFn: () =>
      createSemester({
        number: Number(number),
        label,
        academicYear: academicYear || undefined,
        majorId: Number(majorId),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['semesters'] });
      setOpen(false);
      setNumber('1');
      setLabel('');
      setAcademicYear('');
      setMajorId('');
    },
  });

  const columns = [
    { key: 'number', header: '#', render: (s: Semester) => `S${s.number}` },
    { key: 'label', header: 'Label' },
    { key: 'majorName', header: 'Major' },
    { key: 'academicYear', header: 'Academic Year', render: (s: Semester) => s.academicYear ?? '—' },
  ];

  return (
    <div>
      <PageHeader title="Semesters" action={<Button onClick={() => setOpen(true)}>+ New</Button>} />
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Table columns={columns} data={semesters?.content ?? []} keyExtractor={(s) => s.id} />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New Semester">
        <div className="space-y-3">
          <Input
            label="Semester Number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Input label="Label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Semester 1" />
          <Input
            label="Academic Year (optional)"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="e.g. 2024-2025"
          />
          <div>
            <label className="text-sm font-medium text-gray-700">Major</label>
            <select
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm"
              value={majorId}
              onChange={(e) => setMajorId(e.target.value)}
            >
              <option value="">Select major...</option>
              {majors?.content.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.universityName}
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
              disabled={!label || !majorId}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
