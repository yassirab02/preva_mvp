'use client';

import { useSession } from 'next-auth/react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#1E1B4B] mb-6">My Profile</h1>
      <Card>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium text-gray-900">{session?.user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{session?.user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <Badge status={(session as any)?.role ?? 'STUDENT'} />
          </div>
        </div>
      </Card>
    </div>
  );
}
