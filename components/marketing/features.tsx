"use client"

import { Shield, Timer, ScrollText, Landmark, Sparkles, Workflow } from "lucide-react"

const items = [
  { icon: Shield, title: "Enterprise‑grade security", body: "Robust access controls and SOC2-ready practices." },
  { icon: Timer, title: "Faster decisions", body: "Summaries, extractions, and redlines in seconds." },
  { icon: ScrollText, title: "Draft with context", body: "Ground answers in your precedents and templates." },
  { icon: Landmark, title: "Compliance aware", body: "Keep policies and regional nuances in check." },
  { icon: Sparkles, title: "Assist anywhere", body: "Use AI inside your flows with minimal friction." },
  { icon: Workflow, title: "APIs you’ll love", body: "Clean, predictable endpoints when you’re ready." },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-3xl font-semibold text-balance md:text-4xl">Everything teams need</h2>
        <p className="text-sm text-muted-foreground">Built for legal, trusted by engineering.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="group rounded-xl border bg-card p-5 transition hover:shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-grid size-8 place-items-center rounded-md bg-accent">
                <Icon className="size-4 text-foreground" />
              </span>
              <div className="font-medium">{title}</div>
            </div>
            <p className="text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
