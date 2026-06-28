'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUniversity } from '@/lib/api/universities';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/layout/PageHeader';

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  logoUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewUniversityPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'Morocco' },
  });

  const mutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['universities'] }); router.push('/admin/universities'); },
  });

  return (
    <div className="max-w-lg">
      <PageHeader title="New University" />
      <Card>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register('name')} />
          <Input label="Slug" placeholder="um5-rabat" error={errors.slug?.message} {...register('slug')} />
          <Input label="City" error={errors.city?.message} {...register('city')} />
          <Input label="Country" error={errors.country?.message} {...register('country')} />
          <Input label="Logo URL (optional)" {...register('logoUrl')} />
          <div className="flex gap-3">
            <Button type="submit" loading={isSubmitting || mutation.isPending}>Create</Button>
            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
