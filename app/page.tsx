import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/marketing/hero"
import { Stats } from "@/components/marketing/stats"
import { Features } from "@/components/marketing/features"
import { CtaBand } from "@/components/marketing/cta-band"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <Features />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
