"use client";

import { useState } from "react";
import { DocsFooter } from "@/components/DocsFooter";
import { DocsHeader } from "@/components/DocsHeader";
import { DocsSidebar } from "@/components/DocsSidebar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-surface-canvas">
      <DocsHeader onMenuToggle={() => setSidebarOpen((open) => !open)} />
      <div className="flex min-h-0 flex-1">
        <DocsSidebar
          open={sidebarOpen}
          onNavigate={() => setSidebarOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mx-auto w-full max-w-content flex-1 px-6 py-10">
            {children}
          </div>
          <DocsFooter />
        </div>
      </div>
    </div>
  );
}
