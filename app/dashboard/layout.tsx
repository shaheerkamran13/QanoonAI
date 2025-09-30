import type React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Home, FileText, Settings, LogOut, Search } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Suspense } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="px-2 text-sm font-semibold">QanoonAI</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard" passHref legacyBehavior>
                  <SidebarMenuButton asChild isActive>
                    <span className="flex items-center gap-2">
                      <Home className="size-4" /> <span>Home</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/documents" passHref legacyBehavior>
                  <SidebarMenuButton asChild>
                    <span className="flex items-center gap-2">
                      <FileText className="size-4" /> <span>Documents</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/settings" passHref legacyBehavior>
                  <SidebarMenuButton asChild>
                    <span className="flex items-center gap-2">
                      <Settings className="size-4" /> <span>Settings</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/login" passHref legacyBehavior>
                <SidebarMenuButton asChild>
                  <span className="flex items-center gap-2">
                    <LogOut className="size-4" /> <span>Logout</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="sticky top-0 z-30 flex items-center gap-2 border-b bg-background/80 px-4 py-3 backdrop-blur">
            <SidebarTrigger />
            <div className="relative ml-2 hidden max-w-sm flex-1 items-center md:flex">
              <Search className="pointer-events-none absolute left-2 size-4 text-muted-foreground" />
              <input
                className="w-full rounded-md border bg-background pl-8 pr-3 py-2 text-sm"
                placeholder="Search documents"
                aria-label="Search"
              />
            </div>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
          <div className="p-4 md:p-6">{children}</div>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}
