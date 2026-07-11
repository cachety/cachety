import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-lg text-encre-2">Cette page n'existe pas.</p>
      <Link href="/" className="text-bleu underline hover:no-underline">
        Retour à Filigrane Local
      </Link>
    </div>
  );
}
