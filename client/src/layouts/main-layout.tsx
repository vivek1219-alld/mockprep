import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar - Desktop Only */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {/* Mobile Header */}
        <MobileNav />
        
        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
