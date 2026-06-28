import { SkeletonTable } from '@/components/ui/Skeleton';

export default function AdminLoading() {
  return (
    <div className="p-6">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
      <SkeletonTable />
    </div>
  );
}
