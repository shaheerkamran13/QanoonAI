export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-2">
          <div className="text-lg font-semibold">QanoonAI</div>
          <p className="text-sm text-muted-foreground">Modern, accurate, privacy‑first legal AI.</p>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Product</div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Features</li>
            <li>Pricing</li>
            <li>Changelog</li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Company</div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">Subscribe</div>
          <form className="flex gap-2">
            <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Email address" />
            <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© 2025 QanoonAI</div>
    </footer>
  )
}
