// app/dashboard/layout.tsx
import Sidebar from "@/app/ui/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard for our application",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

    
  return (
    <div className="dashboard-layout">
      {/* You can add common dashboard elements here, like a sidebar or header */}
      <main>{children}</main>
    </div>
  );
}

export const dynamic = 'force-dynamic';
