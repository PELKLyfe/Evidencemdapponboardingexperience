import React, { useState, useMemo } from "react";
import { UserTrack, UserPreferences } from "../App";
import { motion, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  Briefcase, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Search, 
  CheckCircle2,
  Clock,
  FileText,
  SearchCode,
  Microscope,
  ArrowRight,
  Globe,
  Plus,
  X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import logo from "figma:asset/7ead5bbd9cde88ca88371c59497728d3e616cec5.png";
import icon from "figma:asset/3da064fd6e11f40c1af37ff2004ac42f0b002ce3.png";
import { twMerge } from "tailwind-merge";
import { SPECIALTIES, ROLE_TOP_CHIPS, ADMIN_CATEGORIES } from "../data/specialties";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OnboardingProps {
  initialTrack: UserTrack;
  onComplete: (prefs: Partial<UserPreferences>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ initialTrack, onComplete }) => {
  const [step, setStep] = useState(initialTrack ? 1 : 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdminCategory, setSelectedAdminCategory] = useState<string | null>(null);
  const [isSpecialtyConfirmed, setIsSpecialtyConfirmed] = useState(false);
  const [prefs, setPrefs] = useState<Partial<UserPreferences>>({
    track: initialTrack,
    name: "",
    email: "",
    institution: "",
    depth: "fast",
    country: "United States",
    focusAreas: [],
    tasks: [],
    intent: "",
    tone: "professional",
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => {
    if (step > 0) {
      if (step === 1) {
        setStep(0);
        setPrefs(p => ({ ...p, track: null }));
      } else {
        setStep(s => s - 1);
      }
    }
  };

  const renderProfileStep = () => (
    <div className="max-w-2xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">Create your profile.</h1>
      <p className="text-muted-foreground text-center mb-12">Capture your clinical identity for precise workspace calibration.</p>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#006D69] px-1 opacity-60">Full name</label>
          <input 
            type="text"
            placeholder="Dr. Jordan Smith"
            value={prefs.name || ""}
            onChange={(e) => setPrefs(p => ({ ...p, name: e.target.value }))}
            className="w-full p-6 rounded-2xl border border-border bg-paper focus:border-[#006D69] outline-none font-medium transition-all"
          />
        </div>

        {prefs.track !== "patient" && (
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#006D69] px-1 opacity-60">Institution / Clinic / Employer</label>
            <input 
              type="text"
              placeholder="Mayo Clinic / Independent Practice"
              value={prefs.institution || ""}
              onChange={(e) => setPrefs(p => ({ ...p, institution: e.target.value }))}
              className="w-full p-6 rounded-2xl border border-border bg-paper focus:border-[#006D69] outline-none font-medium transition-all"
            />
          </div>
        )}

        <button 
          onClick={nextStep} 
          disabled={!prefs.name}
          className={cn(primaryBtn, "mt-10")}
        >
          Continue <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const filteredSpecialties = useMemo(() => {
    if (!searchQuery.trim() || (!prefs.credential && prefs.track !== "administrative")) return [];
    const query = searchQuery.toLowerCase().trim();
    
    return SPECIALTIES.filter(s => {
      if (prefs.track === "administrative") return s.roles.includes("Administrative") && s.name.toLowerCase().includes(query);
      if (!s.roles.includes(prefs.credential as string)) return false;
      const nameMatch = s.name.toLowerCase().includes(query);
      const synonymMatch = s.synonyms.some(syn => syn.toLowerCase().includes(query));
      return nameMatch || synonymMatch;
    }).slice(0, 8);
  }, [searchQuery, prefs.credential, prefs.track]);

  const toggleSpecialty = (s: string) => {
    setPrefs(p => {
      const current = p.focusAreas || [];
      if (current.includes(s)) return { ...p, focusAreas: current.filter(item => item !== s) };
      return { ...p, focusAreas: [...current, s] };
    });
  };

  // --- REUSABLE STYLES ---
  const primaryBtn = "w-full p-6 bg-[#006D69] text-[#FEFDFB] rounded-2xl font-bold hover:bg-[#003636] transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal/20 disabled:opacity-30 disabled:grayscale";
  const roleBtn = "p-6 rounded-2xl border border-border bg-paper hover:border-[#006D69] hover:bg-[#006D69] hover:text-[#FEFDFB] transition-all font-bold text-ink group flex items-center justify-between";
  const chipBtn = (selected: boolean) => cn(
    "px-5 py-2.5 rounded-full border border-border text-sm font-bold transition-all",
    selected ? "bg-[#006D69] text-[#FEFDFB] border-[#006D69] shadow-md shadow-teal/20" : "bg-paper text-ink hover:border-[#006D69]"
  );

  const renderFork = () => (
    <div className="max-w-2xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">How will you use EvidenceMD?</h1>
      <p className="text-muted-foreground text-center mb-12">This sets your default workspace. You can switch later in Settings.</p>
      
      <div className="grid grid-cols-1 gap-4">
        {[
          { id: "clinical", label: "Clinical", sub: "For providers, nurses, and allied health", icon: <Stethoscope /> },
          { id: "administrative", label: "Administrative", sub: "For operations, insurance, and research", icon: <Briefcase /> },
          { id: "patient", label: "Patient", sub: "For personal health understanding", icon: <User /> },
        ].map((track) => (
          <button
            key={track.id}
            onClick={() => {
              setPrefs(p => ({ ...p, track: track.id as UserTrack }));
              setStep(1);
            }}
            className="flex items-center gap-6 p-8 rounded-3xl border border-border bg-paper hover:border-[#006D69] hover:bg-[#006D69] hover:text-[#FEFDFB] hover:shadow-xl transition-all text-left group"
          >
            <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-[#006D69] group-hover:bg-[#FEFDFB]/20 group-hover:text-[#FEFDFB] transition-all duration-500">
              {React.cloneElement(track.icon as React.ReactElement, { size: 32 })}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1 group-hover:text-[#FEFDFB] transition-colors">{track.label}</h3>
              <p className="text-muted-foreground text-sm group-hover:text-[#FEFDFB]/80 transition-colors">{track.sub}</p>
            </div>
            <ChevronRight className="text-muted-foreground group-hover:text-[#FEFDFB] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderClinicalTrack = () => {
    if (step === 2) {
      const groups = [
        { label: "Providers", roles: ["MD / DO", "NP", "PA"] },
        { label: "Nursing & Pharmacy", roles: ["RN", "PharmD"] },
        { label: "Rehabilitation", roles: ["DPT", "Occupational Therapy", "Speech-Language Pathology", "Respiratory Therapy"] },
        { label: "Specialized & Allied", roles: ["DDS", "OD", "DPM", "DC", "Clinical Psychology", "Genetic Counseling"] },
      ];

      return (
        <div className="max-w-3xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">What is your clinical role?</h1>
          <p className="text-muted-foreground text-center mb-12">Tailoring clinical reasoning and evidence depth to your licensure.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {groups.map((group) => (
              <div key={group.label} className="space-y-4">
                <h3 className="text-[10px] font-bold text-[#006D69] opacity-70 border-b border-teal/10 pb-2">{group.label}</h3>
                <div className="flex flex-col gap-1">
                  {group.roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setPrefs(p => ({ ...p, credential: role }));
                        nextStep();
                      }}
                      className="group flex items-center justify-between py-3 px-4 -mx-4 rounded-xl hover:bg-teal/5 transition-all text-left"
                    >
                      <span className="font-barlow text-lg font-medium text-ink group-hover:text-[#006D69] transition-colors">
                        {role}
                      </span>
                      <ChevronRight size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (step === 3) return (
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">How much detail do you want?</h1>
        <p className="text-muted-foreground text-center mb-12">You can switch per question later. Citations are always on.</p>
        <div className="space-y-4">
          {[
            { id: "fast", label: "Fast", desc: "Short, actionable, 1–3 citations", icon: <Clock /> },
            { id: "detailed", label: "Detailed", desc: "Clinical context + key branches, 3–6 citations", icon: <FileText /> },
            { id: "research", label: "Research", desc: "Structured mini-review, 6–12 citations", icon: <SearchCode /> },
          ].map((mode) => {
            const isSelected = prefs.depth === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setPrefs(p => ({ ...p, depth: mode.id as any }));
                  nextStep();
                }}
                className={cn(
                  "flex items-center gap-6 p-6 rounded-3xl border transition-all text-left w-full group",
                  "bg-[#FEFDFB] text-ink hover:bg-[#006D69] hover:text-[#FEFDFB] hover:border-[#006D69] hover:shadow-xl hover:shadow-teal/10",
                  isSelected ? "border-[#006D69] ring-2 ring-[#006D69]/10" : "border-border"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                  "bg-teal/5 text-[#006D69] group-hover:bg-[#FEFDFB]/20 group-hover:text-[#FEFDFB]"
                )}>
                  {React.cloneElement(mode.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{mode.label}</h3>
                  <p className={cn("text-sm leading-relaxed text-muted-foreground group-hover:text-[#FEFDFB]/80")}>{mode.desc}</p>
                </div>
                {isSelected && <CheckCircle2 className="text-[#006D69] group-hover:text-[#FEFDFB]" size={24} />}
              </button>
            );
          })}
        </div>
      </div>
    );

    if (step === 4) {
      const topChips = prefs.credential ? ROLE_TOP_CHIPS[prefs.credential] || ROLE_TOP_CHIPS["MD / DO"] : ROLE_TOP_CHIPS["MD / DO"];
      const selectedAreas = prefs.focusAreas || [];

      return (
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">What do you practice most?</h1>
          <p className="text-muted-foreground text-center mb-12">Select your focus areas for guideline calibration. These can be updated in Settings.</p>
          
          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {!isSpecialtyConfirmed ? (
                <motion.div 
                  key="selection-mode"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="text-[10px] font-bold text-[#006D69] mb-4 block">Selected areas</label>
                    <div className="flex flex-wrap gap-2 min-h-[44px] p-4 bg-teal/5 rounded-2xl border border-teal/10">
                      {selectedAreas.length === 0 && <span className="text-muted-foreground text-sm italic">No specialties selected yet...</span>}
                      {selectedAreas.map(s => (
                        <button key={s} onClick={() => toggleSpecialty(s)} className="flex items-center gap-2 px-3 py-1.5 bg-[#006D69] text-white rounded-xl text-sm font-bold shadow-lg shadow-teal/20 group">
                          {s} <X size={14} className="opacity-60 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#006D69] mb-4 block">Search & popular</label>
                    <div className="relative mb-6">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        <Search size={20} />
                      </div>
                      <input 
                        type="text"
                        placeholder={`Search for your specialty...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-5 pl-14 rounded-2xl border border-border bg-paper focus:border-[#006D69] outline-none font-medium transition-all"
                      />
                      <AnimatePresence>
                        {searchQuery && filteredSpecialties.length > 0 && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-50 w-full mt-2 bg-[#FEFDFB] border border-border rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                            {filteredSpecialties.map(s => (
                              <button key={s.id} onClick={() => { toggleSpecialty(s.name); setSearchQuery(""); }} className="w-full p-4 text-left hover:bg-[#006D69] hover:text-[#FEFDFB] transition-colors border-b border-border/50 last:border-none flex items-center justify-between group">
                                <span className="font-bold">{s.name}</span>
                                <Plus size={16} />
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topChips.map(s => (
                        <button key={s} onClick={() => toggleSpecialty(s)} className={chipBtn(selectedAreas.includes(s))}>{s}</button>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setIsSpecialtyConfirmed(true)} disabled={selectedAreas.length === 0} className={primaryBtn}>
                    Done <ArrowRight size={20} />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="review-mode"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-10"
                >
                  <div className="p-5 bg-teal/5 rounded-[24px] border border-teal/10 relative overflow-hidden group">
                    <div className="absolute top-3 right-4">
                      <button onClick={() => setIsSpecialtyConfirmed(false)} className="text-[#006D69] text-[10px] font-medium hover:underline flex items-center gap-1 cursor-pointer">
                        Edit <ChevronRight size={10} />
                      </button>
                    </div>
                    <label className="text-[10px] font-medium text-[#006D69] opacity-60 mb-3 block italic">Your focus</label>
                    <div className="flex flex-wrap gap-3">
                      {selectedAreas.map(s => (
                        <div key={s} className="text-lg font-barlow font-medium text-ink tracking-tight">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#006D69] mb-4 block">Where do you practice?</label>
                    <div className="relative">
                      <select className="w-full p-6 rounded-2xl border border-border bg-paper outline-none focus:border-[#006D69] transition-all appearance-none cursor-pointer font-bold text-ink" value={prefs.country} onChange={(e) => setPrefs(p => ({ ...p, country: e.target.value }))}>
                        <option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option><option>European Union</option>
                      </select>
                      <Globe className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={20} />
                    </div>
                  </div>

                  <button onClick={nextStep} className={primaryBtn}>Continue <ArrowRight size={20} /></button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }

    if (step === 5) return (
      <div className="max-w-2xl mx-auto w-full text-center">
        <div className="w-24 h-24 rounded-3xl bg-teal/10 flex items-center justify-center text-[#006D69] mx-auto mb-10 shadow-inner"><CheckCircle2 size={48} /></div>
        <h1 className="text-4xl font-bold mb-4 text-ink">Clinical reasoning active.</h1>
        <p className="text-muted-foreground mb-12">Responses tailored for <span className="text-[#006D69] font-bold">{prefs.credential}</span>.</p>
        <button onClick={() => onComplete(prefs)} className={primaryBtn}>Open my workspace <ArrowRight size={22} /></button>
      </div>
    );
  };

  const renderAdminTrack = () => {
    if (step === 2) return (
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">Administrative focus</h1>
        <p className="text-muted-foreground text-center mb-12">Select your broad area of operation.</p>
        <div className="grid grid-cols-1 gap-3">
          {ADMIN_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedAdminCategory(cat);
                nextStep();
              }}
              className={roleBtn}
            >
              <span>{cat}</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    );

    if (step === 3) {
      const relevantSpecialties = SPECIALTIES.filter(s => s.category === selectedAdminCategory);
      return (
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">{selectedAdminCategory}</h1>
          <p className="text-muted-foreground text-center mb-12">Select your specific domain of expertise.</p>
          <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {relevantSpecialties.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setPrefs(p => ({ ...p, focusAreas: [s.name], credential: "Administrative" }));
                  nextStep();
                }}
                className={cn(roleBtn, (prefs.focusAreas || []).includes(s.name) && "border-[#006D69] bg-[#006D69] text-[#FEFDFB]")}
              >
                <span>{s.name}</span>
                <ChevronRight size={20} />
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (step === 4) {
      const currentTasks = prefs.tasks || [];
      return (
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">What do you need most?</h1>
          <p className="text-muted-foreground text-center mb-12">Pick up to 2 areas for template routing. You can adjust these in Settings later.</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Coverage / benefits explanations",
              "Prior auth + denial support",
              "Coding & documentation support",
              "Care navigation resources",
              "Patient communication templates"
            ].map(task => {
              const isSelected = currentTasks.includes(task);
              return (
                <button
                  key={task}
                  onClick={() => {
                    if (isSelected) setPrefs(p => ({ ...p, tasks: currentTasks.filter(t => t !== task) }));
                    else if (currentTasks.length < 2) setPrefs(p => ({ ...p, tasks: [...currentTasks, task] }));
                  }}
                  className={cn(
                    "p-6 rounded-2xl border border-border bg-paper transition-all font-bold text-left flex items-center justify-between group",
                    isSelected ? "bg-[#006D69] text-[#FEFDFB] border-[#006D69]" : "text-ink hover:border-[#006D69] hover:bg-[#006D69]/5"
                  )}
                >
                  <span className="flex-1">{task}</span>
                  {isSelected ? <CheckCircle2 size={20} /> : <Plus size={20} className="text-muted-foreground group-hover:text-[#006D69]" />}
                </button>
              );
            })}
          </div>
          <div className="mt-10"><button onClick={nextStep} disabled={currentTasks.length === 0} className={primaryBtn}>Continue <ArrowRight size={22} /></button></div>
        </div>
      );
    }

    if (step === 5) return (
      <div className="max-w-2xl mx-auto w-full text-center">
        <div className="w-24 h-24 rounded-3xl bg-teal/10 flex items-center justify-center text-[#006D69] mx-auto mb-10"><CheckCircle2 size={48} /></div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-ink">Setup complete.</h1>
        <p className="text-muted-foreground mb-12">Your administrative hub is tailored for <span className="text-[#006D69] font-bold">{(prefs.focusAreas || [])[0]}</span>.</p>
        <button onClick={() => onComplete(prefs)} className={primaryBtn}>Open Workspace <ArrowRight size={22} /></button>
      </div>
    );
  };

  const renderPatientTrack = () => {
    if (step === 2) return (
      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight text-ink">What do you need today?</h1>
        <div className="grid grid-cols-1 gap-3 mt-12">
          {["Understand results", "Symptoms and next steps", "Medications", "Insurance and costs", "Prepare for appointment"].map(intent => (
            <button key={intent} onClick={() => { setPrefs(p => ({ ...p, intent, credential: "Patient", depth: "fast" as any })); nextStep(); }} className={roleBtn}>
              {intent}<ChevronRight size={20} />
            </button>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-[32px] bg-red-50 border border-red-100 flex flex-col items-center text-center">
          <h4 className="text-red-900 font-bold text-[10px] mb-3">Urgent medical attention</h4>
          <p className="text-red-700 font-barlow text-sm mb-6 max-w-sm">If you are experiencing a medical emergency, please stop and contact emergency services immediately.</p>
          <a 
            href="tel:911" 
            className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-200 flex items-center gap-2 group"
          >
            DIAL 911 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    );
    if (step === 3) return (
      <div className="max-w-2xl mx-auto w-full text-center">
        <div className="w-24 h-24 rounded-3xl bg-teal/10 flex items-center justify-center text-[#006D69] mx-auto mb-10"><CheckCircle2 size={48} /></div>
        <h1 className="text-4xl font-bold mb-4">You're all set.</h1>
        <button onClick={() => onComplete(prefs)} className={primaryBtn}>Start Journey <ArrowRight size={22} /></button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FEFDFB] flex flex-col p-6 overflow-x-hidden selection:bg-teal/20 selection:text-[#006D69]">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center mb-6 sm:mb-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <AnimatePresence>
            {step > 0 && (
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={prevStep} 
                className="hidden sm:flex p-3 rounded-2xl bg-[#FEFDFB] border border-border hover:border-[#006D69] hover:text-[#006D69] transition-all group shadow-sm"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-all" />
              </motion.button>
            )}
          </AnimatePresence>
          <img src={logo} alt="EvidenceMD" className="h-12 w-auto hidden sm:block" />
          <img src={icon} alt="EvidenceMD" className="h-32 w-32 sm:hidden object-contain -mt-2 -mb-10 relative top-2 -left-8" />
        </div>
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3, 4, 5].map(i => <div key={i} className={cn("h-2 rounded-full transition-all duration-700", step === i ? "w-10 bg-[#006D69]" : i < step ? "w-4 bg-teal/30" : "w-4 bg-border")} />)}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center pb-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${prefs.track}-${step}`} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.3 }} 
            className="w-full flex flex-col items-center"
          >
            {step === 0 && renderFork()}
            {step === 1 && renderProfileStep()}
            {prefs.track === "clinical" && renderClinicalTrack()}
            {prefs.track === "administrative" && renderAdminTrack()}
            {prefs.track === "patient" && renderPatientTrack()}

            {/* Mobile Back Button - Now inside AnimatePresence to sync with content */}
            {step > 0 && (
              <button 
                onClick={prevStep} 
                className="sm:hidden mt-12 flex items-center gap-2 text-[#006D69] font-bold py-4 px-8 rounded-2xl hover:bg-[#006D69]/5 transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
                <span>Go back</span>
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
