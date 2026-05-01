import React from 'react';
import { Search, Bell, History } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function TopBar() {
  const location = useLocation();
  
  const getPathBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/ingestion') return 'PostScript Intelligence';
    if (path === '/brief') return 'Q4 Strategic Alignment';
    if (path === '/archive') return 'Workspace / Intelligence Archive';
    return 'PostScript Intelligence';
  };

  const profileImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuABJCSeOAyhjB536F1284Itb2OaW1eT5L2BBFN-_137Pbap1enurVUrSIMZ_xncadcHCGbhUHUaBQ7U39NNqypJKI5dQRFNIZJeNi_aTp_vp7fk08TGuI9RLnKw8eSLodoDd9MpinnmqsPmZE_3YiqkfsULoDALCkz8SSJtXVlxCu_32hgK80i9yICg_8dwIMjYsuuS-hM2Cpen2yo5y8070SOiaCBJOrG5nMLbCDwFUuHwWIyNGETtt3BQSFbgldpJztbutyqVTUu2";

  return (
    <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="flex items-center gap-2">
        <span className="text-zinc-900 font-medium text-sm tracking-tight">{getPathBreadcrumb()}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Search archive..." 
            className="pl-10 pr-4 py-1.5 bg-zinc-100/50 border-transparent focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:outline-none rounded-lg text-sm w-64 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 text-zinc-500">
          <Bell className="size-5 cursor-pointer hover:text-zinc-900 transition-colors" />
          <History className="size-5 cursor-pointer hover:text-zinc-900 transition-colors" />
          <div className="h-8 w-8 rounded-full overflow-hidden border border-zinc-200 cursor-pointer hover:ring-2 hover:ring-zinc-200 transition-all">
            <img src={profileImg} alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </header>
  );
}
