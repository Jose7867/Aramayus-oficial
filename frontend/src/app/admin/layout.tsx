import { AdminSidebar } from '@components/admin/AdminSidebar'
import { AdminTopBar }  from '@components/admin/AdminTopBar'
import { AdminGuard }   from '@components/admin/AdminGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  )
}

