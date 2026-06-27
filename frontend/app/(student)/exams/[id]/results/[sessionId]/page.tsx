'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/lib/api/sessions';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ResultsPage({ params }: { params: Promise<{ id: string; sessionId: string }> }) {
  const { id, sessionId } = use(params);
  const { data: session, isLoading } = useQuery({
    queryKey: ['session', Number(sessionId)],
    queryFn: () => getSession(Number(sessionId)),
  });

  if (isLoading) return <div className="animate-pulse h-64 bg-gray-200 rounded-xl" />;
  if (!session) return <p>Session not found</p>;

  const questions = session.exam?.questions ?? [];
  const answerMap = new Map(session.answers?.map((a) => [a.questionId, a]) ?? []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="text-center">
        <div className="text-5xl font-bold text-[#1E1B4B] mb-2">
          {session.percentageScore?.toFixed(0)}%
        </div>
        <Badge status={session.isPassed ? 'APPROVED' : 'REJECTED'} className="text-sm" />
        <p className="text-gray-500 mt-3">
          Score: {session.score?.toFixed(1)} / {session.exam?.totalPoints} pts
        </p>
        <Link href={`/student/exams/${id}`} className="mt-4 inline-block">
          <Button variant="ghost" size="sm">← Back to Exam</Button>
        </Link>
      </Card>

      <h2 className="text-lg font-semibold text-gray-900">Review Answers</h2>

      {questions.map((q, i) => {
        const answer = answerMap.get(q.id);
        const selectedChoice = q.choices.find((c) => c.id === answer?.choiceId);
        const isCorrect = answer?.isCorrect;

        return (
          <Card key={q.id} className={`border-l-4 ${isCorrect ? 'border-green-400' : 'border-red-400'}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-gray-400 font-medium">Q{i + 1} • {q.points} pts</span>
              <Badge status={isCorrect ? 'APPROVED' : 'REJECTED'} />
            </div>
            <p className="font-medium text-gray-900 mb-3">{q.text}</p>

            {q.questionType === 'QCM' && (
              <div className="space-y-2">
                {q.choices.map((c) => {
                  const isSelected = c.id === answer?.choiceId;
                  const isCorrectChoice = c.isCorrect;
                  return (
                    <div
                      key={c.id}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        isCorrectChoice
                          ? 'bg-green-50 border border-green-300 text-green-800'
                          : isSelected
                          ? 'bg-red-50 border border-red-200 text-red-800'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {c.text}
                      {isCorrectChoice && ' ✓'}
                      {isSelected && !isCorrectChoice && ' ✗'}
                    </div>
                  );
                })}
              </div>
            )}

            {q.explanation && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                <span className="font-medium">Explanation: </span>{q.explanation}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
