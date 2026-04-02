export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-fg-muted">Page not found / Página no encontrada</p>
      <div className="mt-8 flex gap-6">
        <a href="/" className="text-fg hover:text-yellow-400 transition-colors">
          Home (English)
        </a>
        <a href="/es" className="text-fg hover:text-yellow-400 transition-colors">
          Inicio (Español)
        </a>
      </div>
      <a
        href="mailto:info@gexpsoftware.com"
        className="mt-4 text-sm text-fg-muted hover:text-fg transition-colors"
      >
        info@gexpsoftware.com
      </a>
    </main>
  );
}
