'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMajors, createMajor } from '@/lib/api/majors';
import { getUniversities } from '@/lib/api/universities';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/layout/PageHeader';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { Major } from '@/lib/types';

export default function MajorsPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [duration, setDuration] = useState('3');

  const { data: majors, isLoading } = useQuery({ queryKey: ['majors'], queryFn: () => getMajors() });
  const { data: universities } = useQuery({ queryKey: ['universities'], queryFn: () => getUniversities() });

  const mutation = useMutation({
    mutationFn: () => createMajor({ name, slug, durationYears: Number(duration), universityId: Number(universityId) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['majors'] }); setOpen(false); setName(''); setSlug(''); },
  });

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'slug', header: 'Slug' },
    { key: 'universityName', header: 'University' },
    { key: 'durationYears', header: 'Duration', render: (m: Major) => `${m.durationYears} years` },
  ];

  return (
    <div>
      <PageHeader title="Majors" action={<Button onClick={() => setOpen(true)}>+ New</Button>} />
      {isLoading ? <SkeletonTable /> : <Table columns={columns} data={majors?.content ?? []} keyExtractor={(m) => m.id} />}

      <Modal open={open} onClose={() => setOpen(false)} title="New Major">
        <div className="space-y-3">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <Input label="Duration (years)" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <div>
            <label className="text-sm font-medium text-gray-700">University</label>
            <select className="mt-1 w-full px-3 py-2 border rounded-lg text-sm" value={universityId} onChange={(e) => setUniversityId(e.target.value)}>
              <option value="">Select...</option>
              {universities?.content.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => mutation.mutate()} loading={mutation.isPending} disabled={!name || !slug || !universityId}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
