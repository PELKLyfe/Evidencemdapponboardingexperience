import React from "react";
import { UserPreferences } from "../App";
import { 
  Search, 
  PenTool, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import icon from "figma:asset/3da064fd6e11f40c1af37ff2004ac42f0b002ce3.png";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeModule: "ask" | "scribe" | "imaging";
  onModuleChange: (m: "ask" | "scribe" | "imaging") => void;
  onOpenSettings: () => void;
  preferences: UserPreferences;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  onModuleChange, 
  onOpenSettings,
  preferences 
}) => {
  const modules = [
    { id: "ask", label: "Ask EvidenceMD", icon: <Search size={20} /> },
    { id: "scribe", label: "AI Scribe", icon: <PenTool size={20} />, premium: true },
    { id: "imaging", label: "Imaging Analysis", icon: <ImageIcon size={20} />, premium: true },
  ];

  return (
    <aside className="w-72 border-r border-border flex flex-col bg-ink text-white/90">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src={icon} alt="EvidenceMD" className="h-14 w-14 object-contain" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">EvidenceMD</h1>
            <span className="text-[10px] font-bold text-primary/80">Clinical editorial</span>
          </div>
        </div>

        <nav className="space-y-2">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => onModuleChange(m.id as any)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative",
                activeModule === m.id 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "hover:bg-white/5 text-white/60 hover:text-white"
              )}
            >
              <div className={cn(
                "transition-colors",
                activeModule === m.id ? "text-primary" : "text-white/40 group-hover:text-white/60"
              )}>
                {m.icon}
              </div>
              <span className="font-medium text-sm">{m.label}</span>
              {m.premium && (
                <div className="ml-auto opacity-40">
                  <Zap size={14} />
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-white/40">Workspace</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold truncate">
              {preferences.credential || "General User"}
            </span>
          </div>
          <button 
            onClick={onOpenSettings}
            className="w-full flex items-center justify-between text-xs text-white/60 hover:text-white transition-colors group"
          >
            <span>{preferences.track} · {preferences.depth}</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        <div className="space-y-1">
          <button 
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white/30">Plan status</span>
            <span className="text-xs font-bold text-white/80">Free plan</span>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-[10px] font-bold hover:bg-primary transition-all hover:text-white">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};
