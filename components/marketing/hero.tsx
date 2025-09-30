import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-12">
      <div className="md:col-span-7 flex flex-col gap-6">
        <span className="inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
          Modern Legal AI
        </span>
        <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
          Legal work, reimagined with
          <span className="text-primary"> precision and speed</span>
        </h1>
        <p className="text-muted-foreground text-pretty">
          Draft, review, and reason through complex matters in seconds. Built for security, reliability, and teams that
          demand accuracy.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/register">
            <Button className="px-5">Start free</Button>
          </Link>
          <Link href="#demo" className="text-primary underline underline-offset-4">
            View live demo →
          </Link>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            SOC2-ready security
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            Lightning-fast responses
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            Transparent citations
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            24/7 availability
          </li>
        </ul>
      </div>

      <div className="md:col-span-5">
        <Card className="border bg-card/60 backdrop-blur">
          <CardContent className="space-y-3 p-4">
            <div className="rounded-lg border bg-background px-3 py-2 text-sm">
              “Summarize this 12‑page agreement and flag risky clauses.”
            </div>
            <div className="ml-auto w-5/6 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
              Summary ready. 3 risky clauses detected with suggestions.
            </div>
            <div className="rounded-lg border bg-background px-3 py-2 text-sm">
              “Generate a redline to remove auto‑renewal and add notice period.”
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              Generating redline…
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
