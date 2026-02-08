import React, { useState, useRef, useEffect } from "react";
import { UserPreferences } from "../App";
import { 
  Paperclip, 
  Mic, 
  Send, 
  Sparkles, 
  ChevronRight,
  Info,
  ExternalLink,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatInterfaceProps {
  preferences: UserPreferences;
  activeModule: "ask" | "scribe" | "imaging";
  onOpenSettings: () => void;
  onOpenAttachments: () => void;
  files: any[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  preferences, 
  activeModule,
  onOpenSettings,
  onOpenAttachments,
  files
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getExamplePrompts = () => {
    if (preferences.track === "clinical") {
      if (preferences.credential === "PharmD") {
        return [
          "Check interactions between amiodarone and warfarin, dosing implications",
          "Best alternatives if patient has penicillin allergy",
          "Renal dosing for DOACs"
        ];
      }
      if (preferences.credential === "DC") {
        return [
          "Red flags in low back pain that require urgent referral",
          "Evidence for spinal manipulation in acute vs chronic low back pain",
          "When imaging is indicated for back pain"
        ];
      }
      return [
        "Workup for new onset atrial fibrillation in an older adult",
        "Eliquis vs warfarin in CKD stage 4",
        "Summarize the guideline approach to community acquired pneumonia"
      ];
    }
    if (preferences.track === "administrative") {
      return [
        "What documentation supports prior authorization for X?",
        "Explain typical denial reasons for GLP-1 coverage and what to submit",
        "Summarize Medicare vs Medicaid coverage differences for Y"
      ];
    }
    return [
      "Understand my lab results",
      "Prepare for my upcoming appointment",
      "Check medication side effects"
    ];
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Mock response logic would go here
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8"
      >
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-4 tracking-tight">
                Evidence-based medical <span className="text-primary font-editorial">reasoning</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Your clinical context is set to <span className="text-foreground font-bold">{preferences.credential}</span>.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getExamplePrompts().map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="p-5 text-left rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group relative overflow-hidden"
                >
                  <span className="text-sm font-medium leading-relaxed block pr-6">{prompt}</span>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ChevronRight size={18} className="text-primary" />
                  </div>
                </button>
              ))}
              <div className="p-5 rounded-2xl border border-dashed border-border bg-muted/30 flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-all cursor-pointer">
                <Plus size={16} /> New custom workflow
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full space-y-8">
            {messages.map((m, i) => (
              <div key={i} className={cn(
                "flex flex-col gap-2",
                m.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-6 rounded-2xl max-w-[80%] leading-relaxed",
                  m.role === "user" 
                    ? "bg-primary text-white shadow-lg shadow-primary/10" 
                    : "bg-card border border-border"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 md:p-12 pt-0">
        <div className="max-w-4xl mx-auto relative">
          {/* Mode Pill */}
          <div className="absolute -top-12 left-0">
            <button 
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink text-white text-[10px] font-bold hover:bg-primary transition-all shadow-lg"
            >
              <Sparkles size={12} className="text-primary" />
              {preferences.track} · {preferences.depth}
            </button>
          </div>

          <div className="bg-card border border-border rounded-3xl p-2 shadow-2xl shadow-primary/5 focus-within:border-primary/50 transition-all">
            <div className="flex flex-col">
              {files.length > 0 && (
                <div className="flex gap-2 p-2 px-4 border-b border-border/50">
                  {files.map((f, i) => (
                    <div key={i} className="px-2 py-1 rounded bg-muted text-[10px] font-bold flex items-center gap-1">
                      {f.name} <Plus size={10} className="rotate-45" />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center">
                <button 
                  onClick={onOpenAttachments}
                  className="p-4 text-muted-foreground hover:text-primary transition-colors relative"
                >
                  <Paperclip size={20} />
                  {files.length > 0 && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
                <textarea 
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Send a message..."
                  className="flex-1 bg-transparent py-4 text-sm font-medium resize-none outline-none placeholder:text-muted-foreground/50"
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                />
                <div className="flex items-center gap-1 p-2">
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mic size={20} />
                  </button>
                  <button 
                    onClick={handleSend}
                    className={cn(
                      "p-3 rounded-2xl transition-all",
                      input.trim() ? "bg-primary text-white scale-100" : "bg-muted text-muted-foreground scale-95 opacity-50"
                    )}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center px-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                <ShieldCheckIcon size={12} /> HIPAA compliant
              </span>
              <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                <ExternalLink size={12} /> Citations always on
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60">
              <Info size={12} />
              Responses tailored to {preferences.credential}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
