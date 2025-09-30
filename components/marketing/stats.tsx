export function Stats() {
  const items = [
    { k: "10k+", v: "Documents analyzed" },
    { k: "98.7%", v: "Verified accuracy" },
    { k: "50+", v: "Practice areas" },
    { k: "1.2s", v: "Median latency" },
  ]
  return (
    <section className="border-y bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 md:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.k} className="flex flex-col items-center gap-1 py-8 md:border-l first:md:border-l-0">
            <div className="text-3xl font-semibold text-primary">{it.k}</div>
            <div className="text-xs text-muted-foreground">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
