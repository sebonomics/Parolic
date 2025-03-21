import { Suspense } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import Dashboard from "@/components/dashboard"
import AppSidebar from "@/components/app-sidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  )
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[180px] rounded-lg" />
          ))}
      </div>
      <Skeleton className="h-[300px] rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[250px] rounded-lg" />
          ))}
      </div>
    </div>
  )
}

