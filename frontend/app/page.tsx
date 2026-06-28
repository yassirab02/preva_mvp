import Link from 'next/link';

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-lg bg-[#1E1B4B] border border-[#1E1B4B]/20 flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="#C2714F" strokeWidth="2" className="w-4 h-4">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </div>
    <span className="font-bold text-[#1E1B4B] text-lg tracking-tight">Préva</span>
  </div>
);

const features = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>,
    title: 'Real past exams',
    desc: 'Authentic papers from your own university, organized by major, semester, module and submodule.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg>,
    title: 'AI-powered explanations',
    desc: 'Understand every answer with clear, step-by-step explanations generated for each question.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    title: 'Answer statistics',
    desc: 'See exactly what percentage of students chose each answer — and where most people go wrong.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
    title: 'Downloadable PDFs',
    desc: 'Grab course materials and revision PDFs for every module, ready to study offline anytime.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    title: 'Gamified practice',
    desc: 'Timed challenge mode with streaks and daily goals that turn revision into momentum.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" /></svg>,
    title: 'Leaderboard & XP',
    desc: 'Earn XP, level up and climb the leaderboard against students across your university.',
  },
];

const testimonials = [
  {
    quote: 'I went from re-reading my notes to actually practicing the real exams. The AI explanations clicked instantly — I passed Analyse 2 with a 16.',
    name: 'Yasmine B.',
    info: 'SMI · Université Mohammed V',
    initials: 'YB',
  },
  {
    quote: 'Seeing what percentage of students picked each answer is genius. It showed me exactly where everyone gets tricked, so I stopped making those mistakes.',
    name: 'Omar M.',
    info: 'Droit · UCA Marrakech',
    initials: 'OM',
  },
  {
    quote: 'The challenge mode is dangerously addictive. I climbed to #3 on my faculty leaderboard and somehow learned an entire module doing it.',
    name: 'Imane L.',
    info: 'Économie · Université Hassan II',
    initials: 'IL',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            {['Universities', 'How it works', 'Features', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-[#1E1B4B]/60 hover:text-[#1E1B4B] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-[#1E1B4B] hover:text-[#1E1B4B]/70 transition-colors px-3 py-1.5">
              Log In
            </Link>
            <Link href="/auth/register" className="px-4 py-2 text-sm font-semibold bg-[#1E1B4B] text-white rounded-lg hover:bg-[#2d2a6e] transition-colors">
              Start free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E1B4B]/8 text-xs font-medium text-[#1E1B4B]/70 mb-6 border border-[#1E1B4B]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2714F]" />
            Real past papers · 40+ Moroccan universities
          </div>
          <h1 className="text-5xl font-extrabold text-[#1E1B4B] leading-[1.1] tracking-tight mb-6">
            Pass your exams<br />with confidence<br />
            <span className="text-[#1E1B4B]/90">— using real<br />past papers from<br />your university.</span>
          </h1>
          <p className="text-base text-[#1E1B4B]/55 mb-8 leading-relaxed max-w-md">
            Préva gives you authentic past exams, organized by major, semester and module — with AI-powered explanations and gamified practice that keeps you coming back.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/auth/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C2714F] text-white font-semibold rounded-lg hover:bg-[#A85C3A] transition-all text-sm">
              Start practicing free →
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[#1E1B4B] font-medium rounded-lg border border-[#1E1B4B]/20 hover:bg-[#1E1B4B]/5 transition-all text-sm">
              See how it works
            </a>
          </div>
          <p className="text-xs text-[#1E1B4B]/40">
            Joined by <span className="font-semibold text-[#1E1B4B]/60">12,000+</span> students this semester
          </p>
        </div>

        {/* Exam mockup card */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8E2D9] p-6 max-w-sm ml-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 bg-[#F5F0E8] text-[10px] font-medium text-[#1E1B4B]/60 rounded">ANALYSE 2</span>
                <span className="px-2 py-0.5 bg-[#F5F0E8] text-[10px] font-medium text-[#1E1B4B]/60 rounded">SEMESTRE 2</span>
                <span className="px-2 py-0.5 bg-[#F5F0E8] text-[10px] font-medium text-[#1E1B4B]/60 rounded">2024</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Score 92%</span>
            </div>
            <div className="text-xs text-[#1E1B4B]/50 mb-2">Question 7 / 20</div>
            <p className="text-sm font-semibold text-[#1E1B4B] mb-4">Quelle est la limite de sin(x) / x quand x → 0 ?</p>
            <div className="space-y-2 mb-4">
              {[{ label: '0', pct: '78%', color: 'bg-emerald-500', correct: false },
                { label: '1', pct: '44%', color: 'bg-[#C2714F]', correct: true },
                { label: '∞', pct: '7%', color: 'bg-[#E8E2D9]', correct: false },
              ].map((opt) => (
                <div key={opt.label} className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${opt.correct ? 'bg-[#C2714F] text-white' : 'bg-[#F5F0E8] text-[#1E1B4B]/60'}`}>
                    {opt.label}
                  </div>
                  <div className="flex-1 h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden">
                    <div className={`h-full ${opt.color} rounded-full`} style={{ width: opt.pct }} />
                  </div>
                  <span className="text-[10px] text-[#1E1B4B]/40 w-7 text-right">{opt.pct}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#F5F0E8] rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C2714F" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                <span className="text-[10px] font-semibold text-[#C2714F]">AI Explanation</span>
              </div>
              <p className="text-[11px] text-[#1E1B4B]/60 leading-relaxed">
                lim(sin x / x) = 1 follows from the squeeze theorem — as x approaches 0, sin(x) and x become indistinguishable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section id="universities" className="border-t border-[#E8E2D9] py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#1E1B4B]/40 uppercase tracking-widest mb-6">Trusted by students across the Maghreb</p>
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {['Université Mohammed V', 'Université Hassan II', 'Université Cadi Ayyad', 'Université Ibn Tofail', 'Ecole Nationale Polytechnique'].map((u) => (
              <div key={u} className="flex items-center gap-2 text-xs text-[#1E1B4B]/50">
                <div className="w-8 h-8 rounded-full bg-[#1E1B4B]/8 flex items-center justify-center text-[10px] font-bold text-[#1E1B4B]/40">
                  {u.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                {u}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[['12,000+', 'Students practicing'], ['40+', 'Universities covered'], ['95%', 'Repeat-transfer pass rates']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-extrabold text-[#1E1B4B]">{val}</div>
                <div className="text-xs text-[#1E1B4B]/45 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-[#E8E2D9]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#C2714F] uppercase tracking-widest mb-3">HOW IT WORKS</p>
            <h2 className="text-3xl font-extrabold text-[#1E1B4B] leading-tight">From enrollment to exam-<br />ready in three steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: '01', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>, title: 'Choose your path', desc: 'Select your university, major and semester. Préva maps every module and submodule to your exact program.' },
              { num: '02', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>, title: 'Sit real past exams', desc: 'Take authentic past papers under exam conditions — timed, structured, exactly like the real thing.' },
              { num: '03', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>, title: 'Learn & compare', desc: 'Get instant AI explanations and see how your answers stack up against thousands of other students.' },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 border border-[#E8E2D9]">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F0E8] flex items-center justify-center text-[#1E1B4B]/60">{step.icon}</div>
                  <span className="text-2xl font-black text-[#1E1B4B]/8">{step.num}</span>
                </div>
                <h3 className="font-semibold text-[#C2714F] mb-2">{step.title}</h3>
                <p className="text-sm text-[#1E1B4B]/55 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#1E1B4B] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold text-[#C2714F] uppercase tracking-widest mb-3">EVERYTHING YOU NEED</p>
            <h2 className="text-3xl font-extrabold text-white leading-tight">Built for how students<br />actually revise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-white/6 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#C2714F] flex items-center justify-center text-white mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#C2714F] uppercase tracking-widest mb-3">PRICING</p>
            <h2 className="text-3xl font-extrabold text-[#1E1B4B]">Simple, per-semester pricing</h2>
            <p className="text-sm text-[#1E1B4B]/50 mt-2">Pay once per semester. Payment is via bank transfer, confirmed by our team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-[#E8E2D9] p-7">
              <p className="text-xs font-semibold text-[#1E1B4B]/40 uppercase tracking-widest mb-4">FREE</p>
              <div className="text-3xl font-extrabold text-[#1E1B4B] mb-1">0 DH</div>
              <p className="text-sm text-[#1E1B4B]/50 mb-6">Explore the platform and see what&apos;s available for your major.</p>
              <ul className="space-y-2.5 mb-8">
                {['Browse all modules and the full exam catalog', 'See available past papers for your major', 'Preview the platform before subscribing'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1E1B4B]/65">
                    <svg className="w-4 h-4 text-[#1E1B4B]/30 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="block text-center px-5 py-2.5 rounded-xl border border-[#1E1B4B]/20 text-sm font-medium text-[#1E1B4B] hover:bg-[#F5F0E8] transition-colors">
                Browse free
              </Link>
            </div>
            {/* Subscribed */}
            <div className="bg-[#1E1B4B] rounded-2xl p-7 relative">
              <div className="absolute top-5 right-5 px-2.5 py-1 bg-[#C2714F] rounded-lg text-[10px] font-bold text-white uppercase tracking-wide">Most popular</div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">SUBSCRIBED</p>
              <div className="text-3xl font-extrabold text-white mb-1">149 DH</div>
              <p className="text-xs text-white/40 mb-1">/ semester</p>
              <p className="text-sm text-white/55 mb-6">Full access to everything Préva offers, all semester long.</p>
              <ul className="space-y-2.5 mb-8">
                {['Full access to every past exam', 'AI-powered explanations on all questions', 'Downloadable course PDFs', 'Gamified mode, streaks, XP & leaderboard'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                    <svg className="w-4 h-4 text-[#C2714F] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="block text-center px-5 py-2.5 rounded-xl bg-[#C2714F] text-sm font-semibold text-white hover:bg-[#A85C3A] transition-colors">
                Get full access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-[#E8E2D9] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#C2714F] uppercase tracking-widest mb-3">STUDENT STORIES</p>
            <h2 className="text-3xl font-extrabold text-[#1E1B4B]">Real results, real students</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-[#E8E2D9] p-6">
                <div className="text-[#C2714F] text-2xl font-black mb-3 leading-none">&ldquo;</div>
                <p className="text-sm text-[#1E1B4B]/70 leading-relaxed mb-5">{t.quote}</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C2714F] flex items-center justify-center text-xs font-bold text-white shrink-0">{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#1E1B4B]">{t.name}</p>
                    <p className="text-[11px] text-[#1E1B4B]/45">{t.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C2714F] py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-5">
            Prove you&apos;re ready<br />— before exam day.
          </h2>
          <p className="text-white/75 mb-8">
            Join thousands of students practicing with real past papers<br />from their own university. Free to start, no card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/register" className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#1E1B4B] font-semibold rounded-xl hover:bg-[#F5F0E8] transition-colors text-sm">
              Start practicing free
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center px-7 py-3 bg-white/15 border border-white/30 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-sm">
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1B4B] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C2714F" strokeWidth="2" className="w-4 h-4">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <span className="font-bold text-white">Préva</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">Real past exams, AI explanations and gamified practice for university students across Morocco and the Maghreb.</p>
              <div className="flex gap-2">
                {['in', 'X', 'IG'].map((s) => (
                  <div key={s} className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/50">{s}</div>
                ))}
              </div>
            </div>
            {[
              { heading: 'PRODUCT', links: ['Universities', 'Features', 'Pricing', 'Challenge mode'] },
              { heading: 'COMPANY', links: ['About', 'Contact', 'Careers', 'Blog'] },
              { heading: 'SUPPORT', links: ['Help center', 'Bank transfer guide', 'Terms', 'Privacy'] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-3">{col.heading}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm text-white/55 hover:text-white/80 transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between gap-3">
            <p className="text-xs text-white/30">© 2026 Préva. All rights reserved.</p>
            <p className="text-xs text-white/25 italic">Préparez. Pratiquez. Prouvez. — Prepare. Practice. Prove.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
