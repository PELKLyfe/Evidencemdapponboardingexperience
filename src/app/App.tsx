import React, { useState } from "react";
import { Onboarding } from "./components/Onboarding";
import { Settings } from "./components/Settings";
import { 
  Plus, 
  Search, 
  MessageSquare, 
  FileText, 
  ImageIcon, 
  Settings as SettingsIcon, 
  User, 
  ChevronDown, 
  Command, 
  Shield, 
  Globe, 
  Sparkles,
  Zap,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  MoreVertical,
  Paperclip,
  Send,
  ArrowUpRight,
  Mic,
  Lock,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import logo from "figma:asset/7ead5bbd9cde88ca88371c59497728d3e616cec5.png";
import icon from "figma:asset/3da064fd6e11f40c1af37ff2004ac42f0b002ce3.png";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "motion/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
export type UserTrack = "clinical" | "administrative" | "patient" | null;
export type CredentialTier = "patient" | "admin" | "restricted_clinician" | "full_provider";

export type UserPreferences = {
  track: UserTrack;
  credentialTier: CredentialTier;
  name?: string;
  email?: string;
  institution?: string;
  credential?: string;
  licenseNumber?: string;
  focusAreas: string[];
  depth: "fast" | "detailed" | "research";
  country:string;
  language: string;
  tasks?: string[];
  intent?: string;
  tone: "professional" | "academic" | "patient-friendly";
};

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [prefs, setPrefs] = useState<UserPreferences>({
    track: null,
    credentialTier: "patient", // Default
    focusAreas: [],
    depth: "fast",
    country: "United States",
    language: "English",
    tone: "professional"
  });

  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const PROMPT_POOLS = {
    clinical: [
      "review hypertension guidelines", "draft discharge summary", "check drug interactions",
      "differential diagnosis for chest pain", "pathology report interpretation", "pediatric dosage calculation",
      "post-operative care protocol", "analyze metabolic panel", "summarize clinical trial results"
    ],
    administrative: [
      "prior auth letter", "throughput summary", "billing assistant",
      "staff scheduling optimization", "compliance audit preparation", "insurance claim appeal",
      "patient intake workflow", "inventory management report", "quality metric analysis"
    ],
    patient: [
      "explain lab results", "medication side effects", "appointment prep",
      "simplify medical terminology", "lifestyle changes for diabetes", "recovery timeline for surgery",
      "nutrition advice for heart health", "mental health resources", "symptom tracker summary"
    ]
  };

  const getVisiblePrompts = () => {
    const pool = PROMPT_POOLS[prefs.track as keyof typeof PROMPT_POOLS] || PROMPT_POOLS.clinical;
    const startIndex = (currentPromptIndex * 3) % pool.length;
    return pool.slice(startIndex, startIndex + 3);
  };

  const regeneratePrompts = () => {
    setCurrentPromptIndex((prev) => (prev + 1) % 3);
  };

  const handleOnboardingComplete = (newPrefs: Partial<UserPreferences>) => {
    // Determine the permanent Credential Tier based on the final selection
    let track = newPrefs.track || prefs.track;
    let credential = newPrefs.credential || prefs.credential;
    let tier: any = "patient";

    if (track === "patient") {
      tier = "patient";
    } else if (track === "administrative") {
      tier = "admin";
    } else if (track === "clinical") {
      if (["MD / DO", "DDS", "NP", "PA"].includes(credential || "")) {
        tier = "full_provider";
      } else {
        tier = "restricted_clinician";
      }
    }
    
    setPrefs(prev => ({ 
      ...prev, 
      ...newPrefs, 
      track, 
      credentialTier: tier 
    }));
    setIsOnboarded(true);
  };

  // Skip landing page and go straight to onboarding if not onboarded
  if (!isOnboarded) {
    return <Onboarding initialTrack={null} onComplete={handleOnboardingComplete} />;
  }

  // --- Main App Dashboard ---
  return (
    <div className="min-h-screen bg-[#FEFDFB] text-[#003636] flex font-barlow selection:bg-[#006D69]/10 selection:text-[#006D69] overflow-hidden">
      {/* Sidebar - Chat History */}
      <aside 
        className={cn(
          "bg-[#FEFDFB] border-r border-[#006D69]/10 flex flex-col transition-all duration-300 ease-in-out z-50",
          isHistoryOpen ? "w-80" : "w-0 overflow-hidden border-none"
        )}
      >
        <div className="p-6 h-16 border-b border-[#006D69]/10 flex items-center justify-between">
          <span className="text-sm font-bold text-[#006D69]">History</span>
          <button onClick={() => setIsHistoryOpen(false)} className="p-2 hover:bg-[#006D69]/5 rounded-xl transition-all">
            <ChevronRight size={18} className="rotate-180" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {[
            { title: "45m refractory hypertension", meta: "2h ago", icon: <Sparkles size={14} /> },
            { title: "post-op orthopedic summary", meta: "5h ago", icon: <Zap size={14} /> },
            { title: "non-contrast ct brain", meta: "yesterday", icon: <ImageIcon size={14} /> },
            { title: "pediatric asthma protocol", meta: "2d ago", icon: <Sparkles size={14} /> },
            { title: "pre-auth: spinal fusion", meta: "3d ago", icon: <Zap size={14} /> }
          ].map((item, i) => (
            <button key={i} className="w-full p-4 rounded-2xl hover:bg-[#006D69]/5 transition-all text-left group">
              <div className="flex items-center gap-3 mb-1">
                <div className="text-[#006D69] opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold truncate group-hover:text-[#006D69] transition-colors">{item.title}</h4>
              </div>
              <p className="text-[10px] font-medium text-muted-foreground ml-7">{item.meta}</p>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-[#006D69]/10">
          <button className="w-full p-4 rounded-2xl bg-[#006D69] text-[#FEFDFB] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#003636] transition-all shadow-lg shadow-[#006D69]/20">
            <Plus size={18} />
            New Session
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <nav className="h-16 border-b border-[#006D69]/10 px-6 flex items-center justify-between sticky top-0 bg-[#FEFDFB]/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4 sm:gap-8">
            {!isHistoryOpen && (
              <button 
                onClick={() => setIsHistoryOpen(true)}
                className="text-[#003636] hover:translate-x-0.5 transition-all cursor-pointer py-2"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            )}
            <img src={logo} alt="EvidenceMD" className="h-8 w-auto hidden sm:block" />
            <img src={icon} alt="EvidenceMD" className="h-16 w-16 sm:hidden object-contain" />
            
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-[#006D69]/5 p-1 rounded-full border border-[#006D69]/10">
                <button className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#006D69] text-[#FEFDFB] shadow-sm transition-all cursor-pointer">Ask</button>
                <button className="px-4 py-1.5 rounded-full text-sm font-bold text-[#006D69]/40 flex items-center gap-2 hover:bg-[#006D69]/5 transition-all cursor-pointer">
                  Scribe <span className="text-[8px] px-1 py-0.5 rounded-sm bg-[#006D69]/10 text-[#006D69] font-black uppercase tracking-tighter">PRO</span>
                </button>
                <button className="px-4 py-1.5 rounded-full text-sm font-bold text-[#006D69]/40 flex items-center gap-2 hover:bg-[#006D69]/5 transition-all cursor-pointer">
                  Imaging <span className="text-[8px] px-1 py-0.5 rounded-sm bg-[#006D69]/10 text-[#006D69] font-black uppercase tracking-tighter">PRO</span>
                </button>
              </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#006D69]/10 bg-white shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#006D69] animate-pulse" />
              <span className="text-xs font-bold text-[#006D69]">{prefs.track} · {prefs.depth}</span>
            </div>
            {/* Settings merged into profile avatar */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-10 h-10 rounded-full bg-[#006D69] flex items-center justify-center text-[#FEFDFB] font-bold shadow-lg shadow-[#006D69]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {prefs.name?.charAt(0) || "u"}
            </button>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="max-w-4xl mx-auto w-full pt-8 px-6 flex-1">
            <div className="mb-10 space-y-3">
              {/* Status Banner: Plan Tier */}
              <div className="relative overflow-hidden bg-[#003636] rounded-2xl p-5 flex items-center justify-between text-[#FEFDFB]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#006D69]/10 to-transparent rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#006D69]">
                    <Sparkles size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold tracking-tight leading-none mb-1">
                      Welcome! Your Free Plan is Active.
                    </span>
                    <span className="text-[10px] text-white/40 font-medium">
                      You have 4 normal questions & 1 deep search. Upgrade to Pro for unlimited access!
                    </span>
                  </div>
                </div>
                <button className="relative z-10 px-5 py-2 rounded-full bg-[#006D69] text-[#FEFDFB] text-[10px] font-bold hover:bg-[#005a57] transition-all shadow-xl shadow-black/10 cursor-pointer">
                  {prefs.track === "clinical" ? "Unlock PRO" : "Unlock Plus"}
                </button>
              </div>
            </div>

            <header className="mb-12 text-center">
              <div className="flex justify-center mb-6">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#006D69]/10 bg-white hover:bg-[#006D69]/5 transition-all text-[10px] font-bold text-[#006D69] shadow-sm cursor-pointer group">
                  <Shield size={14} className="opacity-60 group-hover:opacity-100" />
                  <span>CME/CPD Tracking · Available on Plus Tier and Above</span>
                </button>
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight">How can I help you today?</h1>
              <p className="text-muted-foreground">Tailored for {prefs.focusAreas.length > 0 ? prefs.focusAreas.join(" & ") : "your clinical practice"} in {prefs.country}.</p>
            </header>

            {/* Content Area - Boxes removed */}
            <div className="mb-12" />

            {/* Preset Prompts Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-[0.2em]">Suggested Modules</span>
                <button 
                  onClick={regeneratePrompts}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-[#006D69] uppercase tracking-wider hover:opacity-70 transition-all cursor-pointer"
                >
                  <RefreshCw size={10} strokeWidth={3} className={cn("transition-transform duration-500", currentPromptIndex !== 0 && "rotate-180")} /> Regenerate
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {getVisiblePrompts().map((prompt, i) => (
                  <button 
                    key={`${prompt}-${i}`} 
                    className="group px-5 py-4 text-left rounded-2xl border border-[#006D69]/10 bg-[#FEFDFB] hover:border-[#006D69]/30 hover:shadow-sm transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-[#003636] line-clamp-1">{prompt}</span>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#006D69]/40 font-medium">Start module</span>
                        <ArrowUpRight size={12} className="text-[#006D69]/20 group-hover:text-[#006D69] transition-colors" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar / Input */}
            <div className="relative mb-20">
              <div className="bg-white rounded-[32px] border border-[#006D69]/20 shadow-2xl p-2 focus-within:border-[#006D69] transition-all">
                <textarea 
                  placeholder="Enter a patient case, lab report, or clinical question..."
                  className="w-full bg-transparent py-1 px-6 outline-none resize-none min-h-[32px] max-h-[120px] font-medium text-base overflow-y-auto"
                />
                <div className="flex items-center justify-between p-2 px-4 border-t border-[#006D69]/5">
                  <div className="flex items-center gap-2 relative">
                    <button 
                      onClick={() => setIsUploadMenuOpen(!isUploadMenuOpen)}
                      className={cn(
                        "p-2 rounded-full hover:bg-[#006D69]/5 text-[#006D69]/60 transition-all flex items-center gap-2 cursor-pointer",
                        isUploadMenuOpen && "bg-[#006D69]/10 text-[#006D69]"
                      )}
                    >
                      <Plus size={18} className={cn("transition-transform duration-200", isUploadMenuOpen && "rotate-45")} />
                    </button>

                    <AnimatePresence>
                      {isUploadMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-0 mb-4 w-56 bg-white rounded-[24px] shadow-2xl border border-[#006D69]/10 p-2 z-50 overflow-hidden"
                        >
                          <div className="flex flex-col">
                            <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-[#006D69]/5 transition-all text-left group">
                              <div className="w-8 h-8 rounded-lg bg-[#006D69]/5 flex items-center justify-center text-[#006D69] group-hover:bg-[#006D69] group-hover:text-white transition-all">
                                <FileText size={16} />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-[#003636]">Upload File</div>
                                <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">PDF, DOCX, TXT</div>
                              </div>
                            </button>
                            <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-[#006D69]/5 transition-all text-left group">
                              <div className="w-8 h-8 rounded-lg bg-[#006D69]/5 flex items-center justify-center text-[#006D69] group-hover:bg-[#006D69] group-hover:text-white transition-all">
                                <ImageIcon size={16} />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-[#003636]">Upload Image</div>
                                <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">JPG, PNG, DICOM</div>
                              </div>
                            </button>
                            <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-[#006D69]/5 transition-all text-left group">
                              <div className="w-8 h-8 rounded-lg bg-[#006D69]/5 flex items-center justify-center text-[#006D69] group-hover:bg-[#006D69] group-hover:text-white transition-all">
                                <Paperclip size={16} />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-[#003636]">Paste Link</div>
                                <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">Research, URL</div>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-full text-[#006D69]/60 hover:bg-[#006D69]/5 transition-all cursor-pointer">
                      <Mic size={18} />
                    </button>
                    <button className="p-2 rounded-full bg-[#006D69] text-[#FEFDFB] hover:bg-[#003636] transition-all cursor-pointer">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-[#006D69]/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#006D69]/40 uppercase tracking-tight">
                  <Shield size={12} /> HIPAA Compliant Storage
                </div>
              </div>
              <p className="text-[10px] font-bold text-[#006D69]/30 uppercase tracking-tight">© 2026 EvidenceMD AI · For professional use only</p>
            </div>
          </div>
        </main>
      </div>

      <Settings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        prefs={prefs}
        onUpdatePrefs={(newPrefs) => setPrefs(prev => ({ ...prev, ...newPrefs }))}
      />
    </div>
  );
}
