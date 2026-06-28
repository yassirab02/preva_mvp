'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createExam } from '@/lib/api/exams';
import { getModules } from '@/lib/api/modules';
import { useRouter } from 'next/navigation';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/layout/PageHeader';

const schema = z.object({
  title: z.string().min(1),
  year: z.coerce.number().min(2000),
  durationMinutes: z.coerce.number().min(1),
  totalPoints: z.coerce.number().positive(),
  passingScore: z.coerce.number().positive(),
  moduleId: z.coerce.number().min(1, 'Module is required'),
  sourcePdfUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewExamPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data: modules } = useQuery({ queryKey: ['modules-all'], queryFn: () => getModules() });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: { year: new Date().getFullYear(), durationMinutes: 90, totalPoints: 20, passingScore: 50 },
  });

  const mutation = useMutation({
    mutationFn: createExam,
    onSuccess: (exam) => { qc.invalidateQueries({ queryKey: ['exams'] }); router.push(`/admin/exams/${exam.id}/questions`); },
  });

  return (
    <div className="max-w-lg">
      <PageHeader title="New Exam" />
      <Card>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
          <Input label="Title" error={errors.title?.message} {...register('title')} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Year" type="number" error={errors.year?.message} {...register('year')} />
            <Input label="Duration (min)" type="number" error={errors.durationMinutes?.message} {...register('durationMinutes')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Total Points" type="number" error={errors.totalPoints?.message} {...register('totalPoints')} />
            <Input label="Passing Score (%)" type="number" error={errors.passingScore?.message} {...register('passingScore')} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Module</label>
            <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" {...register('moduleId')}>
              <option value="">Select module...</option>
              {modules?.content.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            {errors.moduleId && <p className="text-xs text-red-500 mt-1">{errors.moduleId.message}</p>}
          </div>
          <Input label="Source PDF URL (optional)" {...register('sourcePdfUrl')} />
          <div className="flex gap-3">
            <Button type="submit" loading={isSubmitting || mutation.isPending}>Create & Add Questions</Button>
            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
