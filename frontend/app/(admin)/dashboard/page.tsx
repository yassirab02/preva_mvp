'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getRegistrations } from '@/lib/api/registrations';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const { data: regs } = useQuery({
    queryKey: ['registrations', 0],
    queryFn: () => getRegistrations(0, 5),
  });

  const pending = regs?.content.filter((r) => r.status === 'PENDING') ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${session?.user?.name}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Pending Registrations</p>
          <p className="text-3xl font-bold text-[#1E1B4B] mt-1">
            {regs?.content.filter((r) => r.status === 'PENDING').length ?? '—'}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Registrations</p>
          <p className="text-3xl font-bold text-[#1E1B4B] mt-1">{regs?.totalElements ?? '—'}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Your Role</p>
          <Badge status={role ?? 'ADMIN'} className="mt-1" />
        </Card>
      </div>

      {pending.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h2>
          <div className="space-y-2">
            {pending.map((r) => (
              <Link key={r.id} href={`/admin/registrations/${r.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{r.studentName}</p>
                    <p className="text-sm text-gray-500">{r.requestedUniversity} · {r.requestedMajor}</p>
                  </div>
                  <Badge status={r.status} />
                </Card>
              </Link>
            ))}
          </div>
          <Link href="/admin/registrations" className="text-sm text-[#C2714F] hover:underline mt-2 inline-block">
            View all →
          </Link>
        </div>
      )}
    </div>
  );
}
