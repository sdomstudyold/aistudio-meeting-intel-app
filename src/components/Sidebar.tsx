import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, LayoutGrid, Settings, HelpCircle, PlusCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Sidebar() {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Ingestion', path: '/ingestion', icon: UploadCloud },
    { name: 'Intelligence Brief', path: '/brief', icon: FileText },
    { name: 'Archive', path: '/archive', icon: LayoutGrid },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-zinc-200 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.04)] flex flex-col z-40">
      <div className="p-8">
        <div className="flex flex-col">
          <span className="text-xl font-bold uppercase tracking-[0.2em] text-zinc-900">PostScript</span>
          <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] mt-1">Intelligence Archive</span>
        </div>
        <button 
          onClick={() => navigate('/ingestion')}
          className="mt-8 w-full bg-charcoal-primary text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-decision transition-all duration-200 text-sm font-semibold active:scale-[0.98]"
        >
          <PlusCircle className="size-4" />
          Create New Brief
        </button>
      </div>

      <nav className="flex-1 px-0">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 py-3 px-6 border-l-4 transition-all duration-200",
                isActive
                  ? "text-zinc-900 font-bold border-zinc-900 bg-zinc-50"
                  : "text-zinc-500 border-transparent hover:text-zinc-800 hover:bg-zinc-50"
              )
            }
          >
            <item.icon className="size-5" />
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-zinc-100 pb-8">
        <a href="#" className="flex items-center gap-3 text-zinc-500 hover:text-zinc-800 py-3 px-6 hover:bg-zinc-50 transition-all text-sm">
          <Settings className="size-5" />
          <span>Settings</span>
        </a>
        <a href="#" className="flex items-center gap-3 text-zinc-500 hover:text-zinc-800 py-3 px-6 hover:bg-zinc-50 transition-all text-sm">
          <HelpCircle className="size-5" />
          <span>Support</span>
        </a>
      </div>
    </aside>
  );
}
