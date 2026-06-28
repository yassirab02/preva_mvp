'use client';

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-red-600 font-medium">{error.message || 'Something went wrong.'}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-[#1E1B4B] text-white rounded-lg text-sm hover:bg-[#2d2a6b] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
