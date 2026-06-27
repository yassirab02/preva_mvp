'use client';

import { use, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getExam } from '@/lib/api/exams';
import { startSession } from '@/lib/api/sessions';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';

export default function ExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const examId = Number(id);
  const router = useRouter();
  const [error, setError] = useState('');

  const { data: exam, isLoading } = useQuery({
    queryKey: ['exam', examId],
    queryFn: () => getExam(examId),
  });

  const startMutation = useMutation({
    mutationFn: () => startSession(examId),
    onSuccess: (session) => router.push(`/student/exams/${examId}/session?sessionId=${session.id}`),
    onError: (err: any) => setError(err.response?.data?.message || 'Failed to start exam'),
  });

  if (isLoading) return <div className="animate-pulse h-64 bg-gray-200 rounded-xl" />;
  if (!exam) return <p>Exam not found</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title={exam.title} description={`${exam.moduleTitle} · ${exam.year}`} />

      <Card className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold">{exam.durationMinutes} minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Points</p>
            <p className="font-semibold">{exam.totalPoints} pts</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Passing Score</p>
            <p className="font-semibold">{exam.passingScore}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Questions</p>
            <p className="font-semibold">{exam.questions?.length ?? '—'}</p>
          </div>
        </div>
      </Card>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={() => startMutation.mutate()}
        loading={startMutation.isPending}
      >
        Start Exam →
      </Button>
    </div>
  );
}
