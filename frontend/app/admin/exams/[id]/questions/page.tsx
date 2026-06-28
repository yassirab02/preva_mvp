'use client';

import { use, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExam, addQuestion, addChoice, deleteQuestion } from '@/lib/api/exams';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/layout/PageHeader';
import Badge from '@/components/ui/Badge';

export default function QuestionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const examId = Number(id);
  const qc = useQueryClient();

  const { data: exam, isLoading } = useQuery({
    queryKey: ['exam', examId],
    queryFn: () => getExam(examId),
  });

  const [addingQ, setAddingQ] = useState(false);
  const [qText, setQText] = useState('');
  const [qPoints, setQPoints] = useState('1');
  const [qCorrect, setQCorrect] = useState('');
  const [qExplanation, setQExplanation] = useState('');

  const addQMutation = useMutation({
    mutationFn: () => addQuestion(examId, {
      text: qText,
      points: Number(qPoints),
      order: (exam?.questions?.length ?? 0) + 1,
      correctAnswer: qCorrect || undefined,
      explanation: qExplanation || undefined,
      questionType: 'QCM',
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['exam', examId] });
      setQText(''); setQPoints('1'); setQCorrect(''); setQExplanation('');
      setAddingQ(false);
    },
  });

  const deleteQMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['exam', examId] }),
  });

  const [addingChoiceFor, setAddingChoiceFor] = useState<number | null>(null);
  const [choiceText, setChoiceText] = useState('');
  const [choiceCorrect, setChoiceCorrect] = useState(false);

  const addChoiceMutation = useMutation({
    mutationFn: () => addChoice(addingChoiceFor!, {
      text: choiceText,
      isCorrect: choiceCorrect,
      order: 1,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['exam', examId] });
      setChoiceText(''); setChoiceCorrect(false); setAddingChoiceFor(null);
    },
  });

  const questions = exam?.questions ?? [];

  return (
    <div>
      <PageHeader title={`Questions — ${exam?.title ?? ''}`} action={<Button onClick={() => setAddingQ(true)}>+ Add Question</Button>} />

      {addingQ && (
        <Card className="mb-6 border-2 border-[#1E1B4B]">
          <h3 className="font-semibold mb-3">New Question</h3>
          <div className="space-y-3">
            <Input label="Question Text" value={qText} onChange={(e) => setQText(e.target.value)} />
            <Input label="Points" type="number" value={qPoints} onChange={(e) => setQPoints(e.target.value)} />
            <Input label="Correct Answer (for open questions)" value={qCorrect} onChange={(e) => setQCorrect(e.target.value)} />
            <Input label="Explanation" value={qExplanation} onChange={(e) => setQExplanation(e.target.value)} />
            <div className="flex gap-3">
              <Button onClick={() => addQMutation.mutate()} loading={addQMutation.isPending} disabled={!qText}>Save</Button>
              <Button variant="ghost" onClick={() => setAddingQ(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {questions.map((q, i) => (
          <Card key={q.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <span className="text-xs text-gray-400 font-medium">Q{i + 1} • {q.points} pts</span>
                <p className="font-medium text-gray-900 mt-1">{q.text}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="ghost" onClick={() => setAddingChoiceFor(q.id)}>+ Choice</Button>
                <Button size="sm" variant="danger" onClick={() => deleteQMutation.mutate(q.id)}>Delete</Button>
              </div>
            </div>

            {q.choices.length > 0 && (
              <div className="space-y-1.5 mt-3">
                {q.choices.map((c) => (
                  <div key={c.id} className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${c.isCorrect ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-700'}`}>
                    {c.isCorrect && '✓ '}
                    {c.text}
                  </div>
                ))}
              </div>
            )}

            {addingChoiceFor === q.id && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg space-y-2">
                <Input placeholder="Choice text" value={choiceText} onChange={(e) => setChoiceText(e.target.value)} />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={choiceCorrect} onChange={(e) => setChoiceCorrect(e.target.checked)} />
                  Mark as correct
                </label>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => addChoiceMutation.mutate()} loading={addChoiceMutation.isPending} disabled={!choiceText}>Add</Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddingChoiceFor(null)}>Cancel</Button>
                </div>
              </div>
            )}
          </Card>
        ))}

        {questions.length === 0 && !isLoading && (
          <p className="text-gray-400 text-center py-8">No questions yet. Add your first question above.</p>
        )}
      </div>
    </div>
  );
}
