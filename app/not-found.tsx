import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow">
        <span className="node" aria-hidden /> Erreur 404
      </p>
      <h1 className="mt-6 max-w-3xl font-display text-display-xl font-semibold">
        Cette page n&apos;existe pas.
      </h1>
      <Link href="/" className="btn btn-primary mt-10 self-start">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
