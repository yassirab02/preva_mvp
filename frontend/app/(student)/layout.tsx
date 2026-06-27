import StudentNav from '@/components/layout/StudentNav';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <StudentNav />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
