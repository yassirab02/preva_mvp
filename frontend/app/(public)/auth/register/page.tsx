'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { register as registerUser } from '@/lib/api/auth';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  requestedUniversity: z.string().min(1, 'University is required'),
  requestedMajor: z.string().min(1, 'Major is required'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setError('');
    try {
      await registerUser(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Registration submitted!</h2>
          <p className="text-gray-500 mb-6">
            Your account is pending approval. An enrollment officer will review your request.
          </p>
          <Link href="/auth/login" className="text-[#C2714F] font-medium hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E1B4B]">Préva</h1>
          <p className="text-gray-500 mt-2">Create your student account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" placeholder="Yassir Abourial" error={errors.name?.message} {...register('name')} />
            <Input label="Email" type="email" placeholder="you@university.ma" error={errors.email?.message} {...register('email')} />
            <Input label="Password" type="password" placeholder="Min. 8 characters" error={errors.password?.message} {...register('password')} />
            <Input label="University" placeholder="e.g. Université Mohammed V de Rabat" error={errors.requestedUniversity?.message} {...register('requestedUniversity')} />
            <Input label="Major" placeholder="e.g. Licence Sciences Économiques" error={errors.requestedMajor?.message} {...register('requestedMajor')} />
            <Button type="submit" loading={isSubmitting} className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#C2714F] font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
