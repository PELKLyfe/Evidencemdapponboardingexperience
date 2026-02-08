import React from "react";
import { UserPreferences, UserTrack, UserDepth } from "../App";
import { motion } from "motion/react";
import { 
  X, 
  Stethoscope, 
  Briefcase, 
  User, 
  Globe, 
  Target,
  Clock,
  FileText,
  SearchCode,
  Zap,
  Check,
  Languages,
  Layout,
  Lock,
  Unlock
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SettingsModalProps {
  preferences: UserPreferences;
  onClose: () => void;
  onUpdate: (p: Partial<UserPreferences>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  preferences, 
  onClose, 
  onUpdate 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-border bg-paper">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Settings</h2>
            <p className="text-[10px] font-bold text-teal">Workspace configuration & defaults</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-all">
            <X size={20} className="text-ink" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* 1) Workspace */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                <Layout size={18} />
              </div>
              <h3 className="font-bold text-sm text-ink">Workspace</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground mb-3 block">Primary track</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "clinical", label: "Clinical", icon: <Stethoscope size={16} /> },
                    { id: "administrative", label: "Administrative", icon: <Briefcase size={16} /> },
                    { id: "patient", label: "Patient", icon: <User size={16} /> },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onUpdate({ track: t.id as UserTrack })}
                      className={cn(
                        "flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-xs font-bold",
                        preferences.track === t.id 
                          ? "border-teal bg-teal text-white shadow-md shadow-teal/20" 
                          : "border-border hover:border-teal/50 text-ink"
                      )}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground">Role / credential</label>
                  <input 
                    type="text" 
                    value={preferences.credential || ""}
                    onChange={(e) => onUpdate({ credential: e.target.value })}
                    className="w-full p-3 rounded-lg border border-border bg-muted/20 focus:border-teal outline-none text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground">Focus area</label>
                  <input 
                    type="text" 
                    value={preferences.focusArea || ""}
                    onChange={(e) => onUpdate({ focusArea: e.target.value })}
                    className="w-full p-3 rounded-lg border border-border bg-muted/20 focus:border-teal outline-none text-sm font-medium"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-muted-foreground">Country (regulatory context)</label>
                  <select 
                    value={preferences.country}
                    onChange={(e) => onUpdate({ country: e.target.value })}
                    className="w-full p-3 rounded-lg border border-border bg-muted/20 focus:border-teal outline-none text-sm font-bold appearance-none cursor-pointer"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>European Union</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* 2) Answer Defaults */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                <Target size={18} />
              </div>
              <h3 className="font-bold text-sm text-ink">Answer defaults</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground mb-3 block">Depth (citations always on)</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: "fast", label: "Fast", desc: "Short, actionable, 1–3 citations", icon: <Clock size={16} /> },
                    { id: "detailed", label: "Detailed", desc: "Clinical context + key branches, 3–6 citations", icon: <FileText size={16} /> },
                    { id: "research", label: "Research", desc: "Structured mini-review, 6–12 citations", icon: <SearchCode size={16} /> },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => onUpdate({ depth: d.id as UserDepth })}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                        preferences.depth === d.id 
                          ? "border-teal bg-teal/5 ring-1 ring-teal" 
                          : "border-border hover:border-teal/30"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        preferences.depth === d.id ? "bg-teal text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {d.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-ink">{d.label}</h4>
                        <p className="text-[11px] text-muted-foreground">{d.desc}</p>
                      </div>
                      {preferences.depth === d.id && <Check size={18} className="text-teal" />}
                    </button>
                  ))}
                </div>
              </div>

              {(preferences.track === "patient" || preferences.track === "clinical") && (
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground mb-3 block">Tone</label>
                  <div className="flex gap-2 p-1 bg-muted/20 rounded-xl border border-border">
                    <button 
                      onClick={() => onUpdate({ tone: "professional" })}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all",
                        preferences.tone === "professional" ? "bg-white text-ink shadow-sm" : "text-muted-foreground hover:text-ink"
                      )}
                    >
                      Professional
                    </button>
                    <button 
                      onClick={() => onUpdate({ tone: "plain" })}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all",
                        preferences.tone === "plain" ? "bg-white text-ink shadow-sm" : "text-muted-foreground hover:text-ink"
                      )}
                    >
                      Plain language
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 3) Tools & Plan */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                <Zap size={18} />
              </div>
              <h3 className="font-bold text-sm text-ink">Tools & plan</h3>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-ink text-white">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-paper">Free plan</h4>
                    <p className="text-xs text-paper/60">Upgrade to Clinician for $79/mo</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-teal/30 flex items-center justify-center text-teal font-bold text-[10px]">
                    2/5
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Lock size={14} className="text-teal" />
                      <span className="text-sm font-medium">Scribe</span>
                    </div>
                    <span className="text-[9px] font-bold text-teal">Locked</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Lock size={14} className="text-teal" />
                      <span className="text-sm font-medium">Imaging</span>
                    </div>
                    <span className="text-[9px] font-bold text-teal">Locked</span>
                  </div>
                </div>

                <button className="w-full mt-6 p-4 bg-teal text-white rounded-xl font-bold hover:bg-teal/90 transition-all text-sm shadow-lg shadow-teal/20">
                  Upgrade to Clinician
                </button>
              </div>

              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-muted/5">
                <span className="text-[10px] font-bold text-muted-foreground">Usage meter</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-teal" />
                  </div>
                  <span className="text-[10px] font-bold text-ink">40%</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4) Language */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                <Languages size={18} />
              </div>
              <h3 className="font-bold text-sm text-ink">Language</h3>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-ink text-white">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-lg font-headlines font-bold text-paper">Free Plan</h4>
                    <p className="text-xs text-paper/60">Upgrade to Clinician for $79/mo</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-teal/30 flex items-center justify-center text-teal font-bold text-[10px]">
                    2/5
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Lock size={14} className="text-teal" />
                      <span className="text-sm font-medium">Scribe</span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-teal">Locked</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Lock size={14} className="text-teal" />
                      <span className="text-sm font-medium">Imaging</span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-teal">Locked</span>
                  </div>
                </div>

                <button className="w-full mt-6 p-4 bg-teal text-white rounded-xl font-bold hover:bg-teal/90 transition-all text-sm shadow-lg shadow-teal/20">
                  Upgrade to Clinician
                </button>
              </div>

              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-muted/5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Usage Meter</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-teal" />
                  </div>
                  <span className="text-[10px] font-bold text-ink">40%</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4) Language */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
                <Languages size={18} />
              </div>
              <h3 className="font-bold uppercase tracking-wider text-sm text-ink">Language</h3>
            </div>

            <div className="relative">
              <select 
                value={preferences.language}
                onChange={(e) => onUpdate({ language: e.target.value })}
                className="w-full p-4 rounded-xl border border-border bg-muted/20 outline-none focus:border-teal transition-all appearance-none cursor-pointer font-bold text-ink"
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={20} />
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
