import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#1E1B4B] text-white">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#C2714F]">Préva</h1>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="px-4 py-2 text-sm bg-[#C2714F] text-white rounded-lg hover:bg-[#a85c3a] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-bold mb-6 leading-tight">
          Réussissez vos examens universitaires
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Accédez aux examens des années précédentes, entraînez-vous dans des conditions réelles et suivez vos progrès.
        </p>
        <Link
          href="/auth/register"
          className="inline-block px-8 py-4 bg-[#C2714F] text-white text-lg font-medium rounded-xl hover:bg-[#a85c3a] transition-colors"
        >
          Commencer gratuitement →
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Examens réels', desc: 'Des centaines d\'examens des années précédentes de votre université.' },
          { title: 'Chronomètre', desc: 'Simulez les conditions d\'examen avec une minuterie intégrée.' },
          { title: 'Corrections', desc: 'Consultez les bonnes réponses et les explications après chaque examen.' },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
