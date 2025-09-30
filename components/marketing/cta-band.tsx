export function CtaBand() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 pb-16">
      <div className="rounded-2xl border bg-card p-6 md:p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-semibold">Start in minutes</h3>
            <p className="text-sm text-muted-foreground">No credit card required. Connect your auth when ready.</p>
          </div>
          <div className="flex gap-3">
            <a href="/register" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
              Create account
            </a>
            <a href="/login" className="rounded-md border px-4 py-2 text-sm">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
