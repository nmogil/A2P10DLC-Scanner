import { Radio } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="text-center py-20">
        <Radio size={40} className="text-stone-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold tracking-tight text-stone-800 mb-2">
          Page not found
        </h1>
        <p className="text-stone-500 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
        >
          Back to Scanner
        </Link>
      </div>
    </main>
  );
}
