'use client';

import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUniversity, updateUniversity } from '@/lib/api/universities';
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
  country: z.string().min(1),
  city: z.string().min(1),
  logoUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditUniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const univId = Number(id);
  const router = useRouter();
  const qc = useQueryClient();

  const { data: university, isLoading } = useQuery({
    queryKey: ['university', univId],
    queryFn: () => getUniversity(univId),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: university
      ? { name: university.name, slug: university.slug, country: university.country, city: university.city, logoUrl: university.logoUrl ?? '' }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => updateUniversity(univId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['universities'] });
      qc.invalidateQueries({ queryKey: ['university', univId] });
      router.push('/admin/universities');
    },
  });

  if (isLoading) return <p className="text-gray-400 py-8">Loading...</p>;

  return (
    <div className="max-w-lg">
      <PageHeader title="Edit University" />
      <Card>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register('name')} />
          <Input label="Slug" error={errors.slug?.message} {...register('slug')} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Country" error={errors.country?.message} {...register('country')} />
            <Input label="City" error={errors.city?.message} {...register('city')} />
          </div>
          <Input label="Logo URL (optional)" {...register('logoUrl')} />
          <div className="flex gap-3">
            <Button type="submit" loading={isSubmitting || mutation.isPending}>Save Changes</Button>
            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
