import { useContext } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { AuthContext } from "@/App";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const SidebarLink = ({ href, icon, children, active }: SidebarLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer",
          active
            ? "text-primary bg-blue-50"
            : "text-slate-500 hover:bg-slate-100"
        )}
      >
        {icon}
        <span className="ml-3">{children}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [location] = useLocation();
  const { user } = useContext(AuthContext);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icons.logo className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold">MockPrep.online</h1>
      </div>

      <nav className="space-y-1 flex-1">
        <SidebarLink 
          href="/" 
          icon={<Icons.home className="w-5 h-5 mr-3" />}
          active={location === "/"}
        >
          Dashboard
        </SidebarLink>
        
        <SidebarLink 
          href="/tests" 
          icon={<Icons.tests className="w-5 h-5 mr-3" />}
          active={location.startsWith("/test")}
        >
          My Tests
        </SidebarLink>
        
        <SidebarLink 
          href="/analytics" 
          icon={<Icons.analytics className="w-5 h-5 mr-3" />}
          active={location.startsWith("/analytics")}
        >
          Analytics
        </SidebarLink>
        
        <SidebarLink 
          href="/bookmarks" 
          icon={<Icons.bookmarks className="w-5 h-5 mr-3" />}
          active={location.startsWith("/bookmarks")}
        >
          Bookmarks
        </SidebarLink>
        
        <SidebarLink 
          href="/settings" 
          icon={<Icons.settings className="w-5 h-5 mr-3" />}
          active={location.startsWith("/settings")}
        >
          Settings
        </SidebarLink>
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-200">
        <div className="flex items-center px-4 py-2">
          <Avatar className="w-8 h-8 rounded-full mr-3">
            {user?.profileImage ? (
              <AvatarImage src={user.profileImage} alt={user.name} />
            ) : (
              <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-sm font-medium text-slate-800">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500">{user?.email || "user@example.com"}</p>
          </div>
        </div>
        <div 
          className="flex items-center px-4 py-2 mt-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer font-medium"
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/home';
          }}
        >
          <Icons.x className="w-5 h-5 mr-3" />
          <span>Log Out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
