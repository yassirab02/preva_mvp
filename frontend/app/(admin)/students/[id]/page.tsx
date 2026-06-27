'use client';

import { use, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { ApiResponse, Student, AccessControl, AccessType } from '@/lib/types';
import { getStudentAccess, grantAccess, revokeAccess } from '@/lib/api/access';
import { getSemesters } from '@/lib/api/semesters';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import PageHeader from '@/components/layout/PageHeader';

async function getStudent(id: number): Promise<Student> {
  const res = await apiClient.get<ApiResponse<Student>>(`/api/students/${id}`);
  return res.data.data;
}

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const studentId = Number(id);
  const qc = useQueryClient();
  const [grantOpen, setGrantOpen] = useState(false);
  const [semesterId, setSemesterId] = useState('');
  const [accessType, setAccessType] = useState<AccessType>('FULL');

  const { data: student } = useQuery({ queryKey: ['student', studentId], queryFn: () => getStudent(studentId) });
  const { data: accesses } = useQuery({ queryKey: ['access', studentId], queryFn: () => getStudentAccess(studentId) });
  const { data: semesters } = useQuery({ queryKey: ['semesters-all'], queryFn: () => getSemesters() });

  const grantMutation = useMutation({
    mutationFn: () => grantAccess({ studentId, semesterId: Number(semesterId), accessType }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['access', studentId] }); setGrantOpen(false); },
  });

  const revokeMutation = useMutation({
    mutationFn: (id: number) => revokeAccess(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['access', studentId] }),
  });

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        title={student?.name ?? 'Student'}
        description={student?.email}
        action={<Button onClick={() => setGrantOpen(true)}>Grant Access</Button>}
      />

      <Card>
        <h2 className="font-semibold text-gray-900 mb-3">Student Info</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-gray-500">University</p><p className="font-medium">{student?.universityName ?? student?.requestedUniversity ?? '—'}</p></div>
          <div><p className="text-gray-500">Major</p><p className="font-medium">{student?.majorName ?? student?.requestedMajor ?? '—'}</p></div>
        </div>
      </Card>

      <div>
        <h2 className="font-semibold text-gray-900 mb-3">Access Controls</h2>
        {accesses?.length === 0 && <p className="text-gray-400 text-sm">No access granted yet.</p>}
        <div className="space-y-2">
          {accesses?.map((a) => (
            <Card key={a.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-sm">{a.semesterLabel}</p>
                <Badge status={a.accessType} />
                {a.expiresAt && <p className="text-xs text-gray-400 mt-1">Expires {new Date(a.expiresAt).toLocaleDateString()}</p>}
              </div>
              <Button size="sm" variant="danger" onClick={() => revokeMutation.mutate(a.id)}>Revoke</Button>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={grantOpen} onClose={() => setGrantOpen(false)} title="Grant Access">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Semester</label>
            <select
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
            >
              <option value="">Select semester...</option>
              {semesters?.content.map((s) => (
                <option key={s.id} value={s.id}>{s.majorName} — {s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Access Type</label>
            <select
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={accessType}
              onChange={(e) => setAccessType(e.target.value as AccessType)}
            >
              <option value="TRIAL">Trial</option>
              <option value="FULL">Full</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setGrantOpen(false)}>Cancel</Button>
            <Button onClick={() => grantMutation.mutate()} loading={grantMutation.isPending} disabled={!semesterId}>Grant</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
