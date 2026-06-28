'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { register as registerUser } from '@/lib/api/auth';

const schema = z.object({
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  email: z.string().email('Invalid email'),
  requestedUniversity: z.string().min(1, 'Please select your university'),
  password: z.string().min(8, 'At least 8 characters'),
});

type FormData = z.infer<typeof schema>;

const UNIVERSITIES = [
  'Université Mohammed V - Rabat',
  'Université Hassan II - Casablanca',
  'Université Cadi Ayyad - Marrakech',
  'Université Ibn Tofail - Kénitra',
  'Université Sidi Mohamed Ben Abdellah - Fès',
  'Université Abdelmalek Essaâdi - Tanger',
  'Université Ibn Zohr - Agadir',
  'Université Mohammed Premier - Oujda',
  'Université Moulay Ismaïl - Meknès',
  'École Nationale Polytechnique - Rabat',
];

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
      await registerUser({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        requestedUniversity: data.requestedUniversity,
        requestedMajor: '',
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#1E1B4B] mb-2">Account submitted!</h2>
          <p className="text-sm text-[#1E1B4B]/55 mb-6 leading-relaxed">
            Your account is pending approval by an enrollment officer at your university. We&apos;ll email you when it&apos;s ready.
          </p>
          <Link href="/auth/login" className="text-sm text-[#C2714F] font-semibold hover:underline">
            Back to log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — dark navy panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#1E1B4B] flex-col justify-between p-10 relative overflow-hidden shrink-0">
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#C2714F]/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#C2714F" strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg">Préva</span>
        </div>

        <div className="relative">
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-6">
            Prove you&apos;re ready<br />— before exam day.
          </h2>
          <p className="text-sm text-white/55 mb-8 leading-relaxed">
            Real past papers from your university, AI explanations and gamified practice. Free to start.
          </p>
          <ul className="space-y-3 mb-10">
            {['Browse every module and exam for your major', 'AI explanations that actually make sense', 'Streaks, XP and a faculty leaderboard'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full bg-[#C2714F] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              {['#C2714F', '#1E1B4B', '#8B8680'].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#1E1B4B]" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-xs text-white/45"><span className="font-semibold text-white/70">12,000+</span> students across 40+ universities</p>
          </div>
        </div>

        <p className="text-xs text-white/25 italic">Préparez. Pratiquez. Prouvez.</p>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F5F0E8]">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1E1B4B] border border-[#1E1B4B]/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C2714F" strokeWidth="2" className="w-4 h-4">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="font-bold text-[#1E1B4B] text-lg">Préva</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1E1B4B] mb-1">Start practicing free</h1>
            <p className="text-sm text-[#1E1B4B]/50">Create your account — no card required.</p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B4B] mb-1.5">First name</label>
                <input
                  type="text"
                  placeholder="Yasmine"
                  className="w-full px-3.5 py-3 bg-white border border-[#E8E2D9] rounded-xl text-sm text-[#1E1B4B] placeholder-[#1E1B4B]/30 focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]/20 focus:border-[#1E1B4B]/40 transition-all"
                  {...register('firstName')}
                />
                {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1E1B4B] mb-1.5">Last name</label>
                <input
                  type="text"
                  placeholder="Benali"
                  className="w-full px-3.5 py-3 bg-white border border-[#E8E2D9] rounded-xl text-sm text-[#1E1B4B] placeholder-[#1E1B4B]/30 focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]/20 focus:border-[#1E1B4B]/40 transition-all"
                  {...register('lastName')}
                />
                {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1B4B] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@university.ma"
                className="w-full px-4 py-3 bg-white border border-[#E8E2D9] rounded-xl text-sm text-[#1E1B4B] placeholder-[#1E1B4B]/30 focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]/20 focus:border-[#1E1B4B]/40 transition-all"
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1B4B] mb-1.5">Your university</label>
              <select
                className="w-full px-4 py-3 bg-white border border-[#E8E2D9] rounded-xl text-sm text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]/20 focus:border-[#1E1B4B]/40 transition-all appearance-none"
                defaultValue=""
                {...register('requestedUniversity')}
              >
                <option value="" disabled className="text-[#1E1B4B]/40">Select your university…</option>
                {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
              {errors.requestedUniversity && <p className="text-xs text-red-600 mt-1">{errors.requestedUniversity.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1B4B] mb-1.5">Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 bg-white border border-[#E8E2D9] rounded-xl text-sm text-[#1E1B4B] placeholder-[#1E1B4B]/30 focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]/20 focus:border-[#1E1B4B]/40 transition-all"
                {...register('password')}
              />
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#C2714F] text-white font-semibold rounded-xl hover:bg-[#A85C3A] transition-colors text-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Creating account…' : 'Create my free account'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E8E2D9]" />
            <span className="text-xs text-[#1E1B4B]/35">or</span>
            <div className="flex-1 h-px bg-[#E8E2D9]" />
          </div>

          <button className="w-full py-3 bg-white border border-[#E8E2D9] rounded-xl text-sm font-medium text-[#1E1B4B] hover:bg-[#F5F0E8] transition-colors flex items-center justify-center gap-2.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-[#1E1B4B]/40 mt-5 leading-relaxed">
            By creating an account you agree to Préva&apos;s{' '}
            <a href="#" className="text-[#1E1B4B]/60 underline">Terms of Service</a> and{' '}
            <a href="#" className="text-[#1E1B4B]/60 underline">Privacy Policy</a>.
          </p>

          <p className="text-center text-sm text-[#1E1B4B]/50 mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#C2714F] font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
