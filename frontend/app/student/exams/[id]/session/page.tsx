'use client';

import { use, useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getSession, saveAnswer, submitSession } from '@/lib/api/sessions';
import { Question } from '@/lib/types';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

function ExamTimer({ startedAt, durationMinutes, onExpire }: { startedAt: string; durationMinutes: number; onExpire: () => void }) {
  const endTime = new Date(startedAt).getTime() + durationMinutes * 60 * 1000;
  const [remaining, setRemaining] = useState(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setRemaining(secs);
      if (secs === 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isRed = remaining < 300;
  const isAmber = remaining < 600 && !isRed;

  return (
    <span className={`font-mono text-lg font-bold ${isRed ? 'text-red-500 animate-pulse' : isAmber ? 'text-amber-500' : 'text-gray-700'}`}>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  );
}

export default function ExamSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const sessionId = Number(searchParams.get('sessionId'));
  const router = useRouter();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data: session } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getSession(sessionId),
    enabled: !!sessionId,
    staleTime: Infinity,
  });

  const answerMutation = useMutation({
    mutationFn: (data: { questionId: number; choiceId: number }) =>
      saveAnswer(sessionId, data),
  });

  const submitMutation = useMutation({
    mutationFn: () => submitSession(sessionId),
    onSuccess: () => router.push(`/student/exams/${id}/results/${sessionId}`),
  });

  const handleAnswer = useCallback((questionId: number, choiceId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
    answerMutation.mutate({ questionId, choiceId });
  }, [answerMutation]);

  const handleExpire = useCallback(() => {
    submitMutation.mutate();
  }, [submitMutation]);

  if (!session) return <div className="min-h-screen flex items-center justify-center">Loading exam...</div>;

  const questions = session.exam?.questions ?? [];
  const question: Question | undefined = questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const unanswered = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="font-semibold text-gray-900 truncate max-w-lg">{session.examTitle}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{answeredCount}/{questions.length} answered</span>
          <ExamTimer
            startedAt={session.startedAt}
            durationMinutes={session.exam?.durationMinutes ?? 60}
            onExpire={handleExpire}
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setConfirmOpen(true)}
            disabled={submitMutation.isPending}
          >
            Submit
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-48 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <p className="text-xs text-gray-400 font-medium mb-3">QUESTIONS</p>
          <div className="grid grid-cols-4 gap-1.5">
            {questions.map((q, i) => {
              const answered = !!answers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQ(i)}
                  className={`
                    w-8 h-8 rounded-full text-xs font-medium transition-colors
                    ${i === currentQ ? 'bg-[#1E1B4B] text-white' : answered ? 'bg-[#C2714F] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
                  `}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          {question ? (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Q{currentQ + 1}</span>
                <span className="text-xs text-gray-400">{question.points} pts</span>
              </div>

              <p className="text-gray-900 text-lg mb-6">{question.text}</p>

              {question.questionType === 'QCM' && (
                <div className="space-y-3">
                  {question.choices.map((choice) => {
                    const selected = answers[question.id] === choice.id;
                    return (
                      <button
                        key={choice.id}
                        onClick={() => handleAnswer(question.id, choice.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          selected
                            ? 'border-[#1E1B4B] bg-[#1E1B4B]/5 text-[#1E1B4B]'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        {choice.text}
                      </button>
                    );
                  })}
                </div>
              )}

              {question.questionType === 'OPEN' && (
                <textarea
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1E1B4B] focus:border-transparent resize-none"
                  placeholder="Write your answer here..."
                />
              )}

              <div className="flex justify-between mt-8">
                <Button variant="ghost" disabled={currentQ === 0} onClick={() => setCurrentQ((p) => p - 1)}>
                  ← Previous
                </Button>
                <Button disabled={currentQ === questions.length - 1} onClick={() => setCurrentQ((p) => p + 1)}>
                  Next →
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No questions found.</p>
          )}
        </main>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); submitMutation.mutate(); }}
        title="Submit Exam"
        message={`You have ${unanswered} unanswered question${unanswered !== 1 ? 's' : ''}. Are you sure you want to submit?`}
        confirmLabel="Submit Exam"
        loading={submitMutation.isPending}
      />
    </div>
  );
}
