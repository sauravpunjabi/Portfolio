import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs text-zinc-600 tracking-[0.2em] uppercase mb-8">
        404
      </span>
      <h1 className="text-6xl md:text-8xl font-bold text-zinc-100 mb-4">
        Not found.
      </h1>
      <p className="text-zinc-500 mb-12 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-zinc-50 text-zinc-900 text-sm font-semibold rounded-full hover:bg-white transition-all duration-300"
      >
        Back to portfolio
      </Link>
    </div>
  );
}
