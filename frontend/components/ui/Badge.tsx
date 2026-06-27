interface BadgeProps {
  status: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  ACTIVE: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  SUSPENDED: 'bg-red-100 text-red-800',
  DRAFT: 'bg-gray-100 text-gray-700',
  PUBLISHED: 'bg-blue-100 text-blue-800',
  ARCHIVED: 'bg-gray-200 text-gray-600',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  ABANDONED: 'bg-gray-100 text-gray-600',
  TRIAL: 'bg-orange-100 text-orange-800',
  FULL: 'bg-purple-100 text-purple-800',
};

export default function Badge({ status, className = '' }: BadgeProps) {
  const color = colorMap[status] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
