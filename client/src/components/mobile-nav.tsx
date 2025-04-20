import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Icons } from "@/components/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icons.logo className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">MockPrep.online</h1>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-slate-500 hover:text-slate-700">
                <Icons.home className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-3 p-4 border-b border-slate-200">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icons.logo className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-xl font-semibold">MockPrep.online</h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  <Link href="/" onClick={closeSheet}>
                    <div
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer",
                        location === "/"
                          ? "text-primary bg-blue-50"
                          : "text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      <Icons.home className="w-5 h-5 mr-3" />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  <Link href="/tests" onClick={closeSheet}>
                    <div
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer",
                        location.startsWith("/test")
                          ? "text-primary bg-blue-50"
                          : "text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      <Icons.tests className="w-5 h-5 mr-3" />
                      <span>My Tests</span>
                    </div>
                  </Link>
                  <Link href="/analytics" onClick={closeSheet}>
                    <div
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer",
                        location.startsWith("/analytics")
                          ? "text-primary bg-blue-50"
                          : "text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      <Icons.analytics className="w-5 h-5 mr-3" />
                      <span>Analytics</span>
                    </div>
                  </Link>
                  <Link href="/bookmarks" onClick={closeSheet}>
                    <div
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer",
                        location.startsWith("/bookmarks")
                          ? "text-primary bg-blue-50"
                          : "text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      <Icons.bookmarks className="w-5 h-5 mr-3" />
                      <span>Bookmarks</span>
                    </div>
                  </Link>
                  <Link href="/settings" onClick={closeSheet}>
                    <div
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer",
                        location.startsWith("/settings")
                          ? "text-primary bg-blue-50"
                          : "text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      <Icons.settings className="w-5 h-5 mr-3" />
                      <span>Settings</span>
                    </div>
                  </Link>
                  
                  {/* Logout Button */}
                  <div 
                    className="flex items-center px-4 py-2 mt-4 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer font-medium"
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/home';
                      closeSheet();
                    }}
                  >
                    <Icons.x className="w-5 h-5 mr-3" />
                    <span>Log Out</span>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 z-50">
        <div className="flex justify-around">
          <Link href="/">
            <div className={cn(
              "flex flex-col items-center py-1 px-3 cursor-pointer",
              location === "/" ? "text-primary" : "text-slate-500"
            )}>
              <Icons.home className="text-lg w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </div>
          </Link>
          <Link href="/tests">
            <div className={cn(
              "flex flex-col items-center py-1 px-3 cursor-pointer",
              location.startsWith("/test") ? "text-primary" : "text-slate-500"
            )}>
              <Icons.tests className="text-lg w-5 h-5" />
              <span className="text-xs mt-1">Tests</span>
            </div>
          </Link>
          <Link href="/analytics">
            <div className={cn(
              "flex flex-col items-center py-1 px-3 cursor-pointer",
              location.startsWith("/analytics") ? "text-primary" : "text-slate-500"
            )}>
              <Icons.analytics className="text-lg w-5 h-5" />
              <span className="text-xs mt-1">Analytics</span>
            </div>
          </Link>
          <Link href="/profile">
            <div className={cn(
              "flex flex-col items-center py-1 px-3 cursor-pointer",
              location.startsWith("/profile") ? "text-primary" : "text-slate-500"
            )}>
              <Icons.user className="text-lg w-5 h-5" />
              <span className="text-xs mt-1">Profile</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
