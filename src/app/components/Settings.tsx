import React, { useState } from "react";
import { 
  X, 
  User, 
  Globe, 
  MessageSquare, 
  Zap, 
  Sparkles, 
  Bell, 
  Shield, 
  FileText, 
  Clock, 
  LogOut, 
  ChevronRight, 
  CreditCard,
  Mail,
  ShieldCheck,
  Smartphone,
  Check,
  AlertCircle,
  HelpCircle,
  Trash2,
  ExternalLink,
  Info,
  Mic,
  ImageIcon,
  Lock,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../App";
import { UserPreferences, UserTrack } from "../App";

import { SPECIALTIES, ROLE_TOP_CHIPS } from "../data/specialties";

// Legal Component Imports
import { PrivacyPolicy } from "../legal/PrivacyPolicy";
import { TermsAndConditions } from "../legal/TermsAndConditions";
import { HIPAABAA } from "../legal/HIPAABAA";
import { MedicalDisclaimer } from "../legal/MedicalDisclaimer";
import { ThirdPartyNotices } from "../legal/ThirdPartyNotices";

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Chinese (Mandarin)", "Japanese", "Korean", "Arabic", "Portuguese", "Russian",
  "Italian", "Dutch", "Turkish", "Hindi", "Vietnamese", "Polish", "Swedish", "Indonesian", "Norwegian", "Danish",
  "Finnish", "Greek", "Hebrew", "Thai", "Czech", "Romanian", "Hungarian", "Ukrainian", "Malay", "Slovak",
  "Catalan", "Bulgarian", "Croatian", "Lithuanian", "Slovenian", "Estonian", "Persian", "Urdu", "Bengali", "Telugu",
  "Marathi", "Tamil", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Sinhala", "Burmese", "Khmer", "Lao",
  "Tagalog", "Swahili", "Amharic", "Oromo", "Somali", "Zulu", "Icelandic", "Malay", "Albanian", "Georgian"
];

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  prefs: UserPreferences;
  onUpdatePrefs: (prefs: Partial<UserPreferences>) => void;
}

type SettingsSection = 
  | "account_role_permissions"
  | "profile" 
  | "answers" 
  | "tools" 
  | "plan" 
  | "notifications" 
  | "privacy" 
  | "legal" 
  | "support" 
  | "account";

const SECTION_META: Record<SettingsSection, { title: string; subtitle: string }> = {
  account_role_permissions: { title: "Account Role & Permissions", subtitle: "Manage role-based access and security constraints" },
  profile: { title: "Profile", subtitle: "Manage your public and private information" },
  answers: { title: "Answer Preferences", subtitle: "Customize how information is delivered to you" },
  tools: { title: "Tools", subtitle: "Manage advanced clinical and administrative tools" },
  plan: { title: "Plan & Billing", subtitle: "Manage your subscription and billing details" },
  notifications: { title: "Notifications", subtitle: "Configure how and when you receive alerts" },
  privacy: { title: "Data & Privacy", subtitle: "Control your data retention and privacy settings" },
  legal: { title: "Legal", subtitle: "Review terms of service and legal disclosures" },
  support: { title: "Support", subtitle: "Get help and view system status" },
  account: { title: "Account", subtitle: "Manage your account security and sessions" }
};

export function Settings({ isOpen, onClose, prefs, onUpdatePrefs }: SettingsProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");

  const sidebarItems: { id: SettingsSection; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "account_role_permissions", label: "Role & Permissions", icon: <ShieldCheck size={18} /> },
    { id: "answers", label: "Answer Preferences", icon: <MessageSquare size={18} /> },
    { id: "tools", label: "Tools", icon: <Zap size={18} /> },
    { id: "plan", label: "Plan & Billing", icon: <Sparkles size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "privacy", label: "Data & Privacy", icon: <Shield size={18} /> },
    { id: "legal", label: "Legal", icon: <FileText size={18} /> },
    { id: "support", label: "Support", icon: <Clock size={18} /> },
    { id: "account", label: "Account", icon: <Info size={18} /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "account_role_permissions":
        return <AccountRolePermissionsSection prefs={prefs} onUpdate={onUpdatePrefs} setActiveSection={setActiveSection} />;
      case "profile":
        return <ProfileSection prefs={prefs} onUpdate={onUpdatePrefs} />;
      case "answers":
        return <AnswersSection prefs={prefs} onUpdate={onUpdatePrefs} />;
      case "tools":
        return <ToolsSection prefs={prefs} setActiveSection={setActiveSection} />;
      case "plan":
        return <PlanSection prefs={prefs} />;
      case "notifications":
        return <NotificationsSection />;
      case "privacy":
        return <PrivacySection />;
      case "legal":
        return <LegalSection />;
      case "support":
        return <SupportSection />;
      case "account":
        return <AccountSection onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#003636]/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#FEFDFB] w-full max-w-6xl h-full max-h-[850px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#006D69]/10"
          >
            {/* Sidebar */}
            <aside className="w-full md:w-72 bg-[#006D69]/5 border-r border-[#006D69]/10 flex flex-col">
              <div className="p-8 border-b border-[#006D69]/10">
                <h2 className="text-xl font-bold text-[#003636]">Settings</h2>
                <p className="text-xs font-medium text-[#006D69]/60 mt-1">Manage your account & preferences</p>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "w-full flex items-center px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                      activeSection === item.id 
                        ? "bg-[#006D69] text-[#FEFDFB] shadow-lg shadow-[#006D69]/20" 
                        : "text-[#006D69]/70 hover:bg-[#006D69]/10 hover:text-[#003636]"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="p-6 border-t border-[#006D69]/10">
                <button 
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#003636] text-[#FEFDFB] text-sm font-bold hover:bg-[#005a57] transition-all"
                >
                  Return to Workspace
                </button>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
              <header className="h-20 px-10 border-b border-[#006D69]/5 flex items-center justify-between flex-shrink-0">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-[#003636]">
                    {SECTION_META[activeSection].title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-medium -mt-1">
                    {SECTION_META[activeSection].subtitle}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#006D69]/5 text-[#006D69]/40 hover:text-[#006D69] transition-all"
                >
                  <X size={20} />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto p-10">
                {renderSection()}
              </div>
            </main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Combined Account Role & Permissions Section ---

function AccountRolePermissionsSection({ 
  prefs, 
  onUpdate,
  setActiveSection 
}: { 
  prefs: UserPreferences; 
  onUpdate: (p: Partial<UserPreferences>) => void;
  setActiveSection: (s: SettingsSection) => void;
}) {
  const { credentialTier, track, credential } = prefs;
  
  const isFullProvider = credentialTier === "full_provider";
  const isRestrictedClinician = credentialTier === "restricted_clinician";
  const isLockedAdmin = credentialTier === "admin";
  const isLockedPatient = credentialTier === "patient";

  const getStatusInfo = () => {
    // 1. Full Provider Tier
    if (isFullProvider) {
      return {
        locked: false,
        text: track === "patient" 
          ? "You are viewing the app as a Patient. Your provider access remains unchanged."
          : "You have full provider access. Role switching enabled.",
        badge: "Verified Access: Provider",
        canEditSpecialty: true
      };
    }

    // 2. Restricted Clinician Tier
    if (isRestrictedClinician) {
      return {
        locked: true,
        text: "Your role is restricted based on your credential type. Specialty changes are allowed within your role.",
        badge: "Verified Access: Clinician",
        canEditSpecialty: true
      };
    }

    // 3. Admin Tier
    if (isLockedAdmin) {
      return {
        locked: true,
        text: "Administrator accounts cannot switch into Clinical roles.",
        cta: "Contact support to update permissions.",
        badge: "Verified Access: Admin",
        canEditSpecialty: false
      };
    }

    // 4. Patient Tier
    if (isLockedPatient) {
      return {
        locked: true,
        text: "You are registered as a Patient account. Role switching is disabled for security purposes.",
        cta: "Request role change",
        badge: "Verified Access: Patient",
        canEditSpecialty: false
      };
    }

    return null;
  };

  const status = getStatusInfo();
  const roleSwitchingDisabled = status?.locked ?? true;
  const specialtyEnabled = status?.canEditSpecialty ?? false;

  return (
    <div className="max-w-2xl space-y-12">
      <div className="space-y-8">
        {/* Account Status Badge */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#006D69]" />
            <h4 className="text-sm font-bold text-[#003636]">Account Role & Permissions</h4>
          </div>
          {status?.badge && (
            <span className="px-3 py-1 rounded-full bg-[#006D69]/10 text-[#006D69] text-[10px] font-black uppercase tracking-wider">
              {status.badge}
            </span>
          )}
        </div>

        <div className="p-8 rounded-[32px] border border-[#006D69]/10 space-y-8 shadow-sm bg-white">
          {/* Current Role (Read-only label) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest px-1">Current Role</label>
            <div className="px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-[#003636]/60 flex items-center justify-between">
              {credential || (isLockedAdmin ? "Administrator" : "User")}
              <Lock size={14} className="opacity-20" />
            </div>
          </div>

          {/* Specialty (Editable only if allowed) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest px-1">Specialty / Focus</label>
            <div className="relative">
              <select 
                disabled={!specialtyEnabled || track !== "clinical"}
                value={(prefs.focusAreas || [])[0]}
                onChange={(e) => onUpdate({ focusAreas: [e.target.value] })}
                className={cn(
                  "w-full px-5 py-4 rounded-2xl border-none outline-none text-sm font-bold appearance-none transition-all pr-12",
                  !specialtyEnabled || track !== "clinical"
                    ? "bg-gray-50 text-[#003636]/30 cursor-not-allowed" 
                    : "bg-[#006D69]/5 text-[#003636] cursor-pointer hover:bg-[#006D69]/10"
                )}
              >
                {(!specialtyEnabled || track !== "clinical") ? (
                  <option>N/A - Specialty editing disabled for this view</option>
                ) : (
                  ROLE_TOP_CHIPS[credential || "MD / DO"]?.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))
                )}
              </select>
              {(specialtyEnabled && track === "clinical") ? (
                <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#006D69] pointer-events-none" />
              ) : (
                <Lock size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#003636]/20 pointer-events-none" />
              )}
            </div>
          </div>

          {/* Role Switching Dropdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest">Role Switching (Workspace View)</label>
              {roleSwitchingDisabled && <Lock size={12} className="text-[#006D69]/40" />}
            </div>
            <div className="relative">
              <select 
                disabled={roleSwitchingDisabled}
                value={track || "clinical"}
                onChange={(e) => {
                  const newTrack = e.target.value as UserTrack;
                  onUpdate({ track: newTrack });
                }}
                className={cn(
                  "w-full px-5 py-4 rounded-2xl border-none outline-none text-sm font-bold appearance-none transition-all pr-12",
                  roleSwitchingDisabled 
                    ? "bg-[#006D69]/5 text-[#003636]/40 cursor-not-allowed shadow-inner" 
                    : "bg-[#006D69]/10 text-[#003636] cursor-pointer hover:bg-[#006D69]/20"
                )}
              >
                <option value="clinical">Clinical Workspace</option>
                <option value="administrative">Administrative Workspace</option>
                <option value="patient">Patient Workspace</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                {!roleSwitchingDisabled ? (
                  <ChevronDown size={14} className="text-[#006D69]" />
                ) : (
                  <Lock size={14} className="text-[#006D69]/20" />
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 px-1 pt-2">
              <p className={cn(
                "text-[11px] font-medium leading-relaxed italic",
                isFullProvider && track === "patient" ? "text-amber-600" : "text-[#006D69]/70"
              )}>
                {isFullProvider && track === "patient" && <AlertCircle size={10} className="inline mr-1 mb-0.5" />}
                {status?.text}
              </p>
              {status?.cta && (
                <button 
                  onClick={() => setActiveSection("support")}
                  className="text-[11px] font-bold text-[#006D69] hover:underline text-left flex items-center gap-1"
                >
                  {status.cta} <ChevronRight size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Configuration */}
      <div className="space-y-6">
        <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest px-1">Regional Preferences</label>
        <div className="p-8 rounded-[32px] border border-[#006D69]/10 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest px-1">Practice Country</label>
            <div className="relative">
              <select 
                defaultValue={prefs.country}
                onChange={(e) => onUpdate({ country: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-[#006D69]/5 border-none outline-none text-sm font-bold appearance-none cursor-pointer pr-12"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Canada</option>
                <option>Germany</option>
              </select>
              <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#006D69] pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest px-1">Interface Language</label>
            <div className="relative">
              <select 
                value={prefs.language}
                onChange={(e) => onUpdate({ language: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-[#006D69]/5 border-none outline-none text-sm font-bold appearance-none cursor-pointer pr-12"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#006D69] pointer-events-none" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#003636] text-white/80 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter opacity-60">
              <Info size={12} /> Calibration Notice
            </div>
            <p className="text-[11px] leading-relaxed">
              Workspace configuration adjusts reasoning depth, citation style, and clinical guardrails. For role adjustments not available in this menu, please contact your institution administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ prefs, onUpdate }: { prefs: UserPreferences; onUpdate: (p: Partial<UserPreferences>) => void }) {
  const isVerified = !!prefs.licenseNumber;

  const tierLabels: Record<CredentialTier, string> = {
    patient: "Patient",
    admin: "Administrator",
    restricted_clinician: "Clinician",
    full_provider: "Provider"
  };

  return (
    <div className="max-w-2xl space-y-10">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#006D69] flex items-center justify-center text-[#FEFDFB] text-4xl font-bold shadow-xl shadow-[#006D69]/20 relative">
          {prefs.name?.charAt(0) || "U"}
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg border border-[#006D69]/10">
              <ShieldCheck size={16} className="text-[#006D69]" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-2xl font-bold text-[#003636]">{prefs.name || "User Name"}</h4>
            {isVerified ? (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#006D69] bg-[#006D69]/5 px-2 py-0.5 rounded-full">
                <ShieldCheck size={10} /> Verified
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                <AlertCircle size={10} /> Unverified
              </span>
            )}
          </div>
          <p className="text-muted-foreground">{prefs.email || "user@example.com"}</p>
          <div className="flex gap-2 mt-3">
            <span className="px-3 py-1 rounded-full bg-[#006D69]/10 text-[#006D69] text-[10px] font-black uppercase tracking-wider">
              {tierLabels[prefs.credentialTier]}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#003636]/5 text-[#003636]/60 text-[10px] font-black uppercase tracking-wider">Free Plan</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-10 border-t border-[#006D69]/5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest">First Name</label>
          <input 
            type="text" 
            defaultValue={prefs.name?.split(" ")[0]} 
            className="w-full px-5 py-3 rounded-2xl bg-[#006D69]/5 border-none outline-none focus:ring-2 focus:ring-[#006D69]/20 text-sm font-bold" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest">Last Name</label>
          <input 
            type="text" 
            defaultValue={prefs.name?.split(" ")[1]} 
            className="w-full px-5 py-3 rounded-2xl bg-[#006D69]/5 border-none outline-none focus:ring-2 focus:ring-[#006D69]/20 text-sm font-bold" 
          />
        </div>
        <div className="space-y-2 col-span-2">
          <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest">Institution / Organization</label>
          <input 
            type="text" 
            placeholder="Optional" 
            defaultValue={prefs.institution} 
            className="w-full px-5 py-3 rounded-2xl bg-[#006D69]/5 border-none outline-none focus:ring-2 focus:ring-[#006D69]/20 text-sm font-bold" 
          />
        </div>

        {/* Professional License Field */}
        <div className="space-y-2 col-span-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-widest">Professional License Number (NPI / GMC / AHPRA)</label>
            {!isVerified && <span className="text-[10px] font-bold text-amber-600">Verification Required</span>}
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Enter license number to verify your provider status" 
              defaultValue={prefs.licenseNumber}
              onBlur={(e) => onUpdate({ licenseNumber: e.target.value })}
              className={cn(
                "w-full px-5 py-3 rounded-2xl border-none outline-none focus:ring-2 text-sm font-bold pr-12 transition-all",
                isVerified 
                  ? "bg-[#006D69]/5 ring-[#006D69]/20" 
                  : "bg-amber-50/30 ring-amber-100 placeholder:text-amber-800/30"
              )}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              {isVerified ? (
                <ShieldCheck size={16} className="text-[#006D69]" />
              ) : (
                <Shield size={16} className="text-amber-300" />
              )}
            </div>
          </div>
          {!isVerified && (
            <p className="text-[11px] text-[#006D69]/60 px-1 mt-1">
              Adding your license number enables clinical precision modes and removes HIPAA-related workspace restrictions.
            </p>
          )}
        </div>
      </div>

      <div className="pt-6">
        <button className="px-8 py-3 rounded-2xl bg-[#006D69] text-[#FEFDFB] font-bold text-sm shadow-lg shadow-[#006D69]/20 hover:bg-[#003636] transition-all">
          Save Profile Changes
        </button>
      </div>
    </div>
  );
}

function AnswersSection({ prefs, onUpdate }: { prefs: UserPreferences; onUpdate: (p: Partial<UserPreferences>) => void }) {
  return (
    <div className="max-w-2xl space-y-12">
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-[0.2em]">Answer Depth</label>
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: "fast", label: "Fast", desc: "Concise actions, 1–3 citations" },
            { id: "detailed", label: "Detailed", desc: "More context, 3–6 citations" },
            { id: "research", label: "Research", desc: "Structured mini-review, 6–12 citations" }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ depth: opt.id as any })}
              className={cn(
                "flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left",
                prefs.depth === opt.id 
                  ? "border-[#006D69] bg-[#006D69]/5" 
                  : "border-[#006D69]/10 hover:border-[#006D69]/30"
              )}
            >
              <div>
                <div className={cn("text-sm font-bold", prefs.depth === opt.id ? "text-[#006D69]" : "text-[#003636]")}>{opt.label}</div>
                <div className="text-xs text-muted-foreground">{opt.desc}</div>
              </div>
              {prefs.depth === opt.id && <Check size={18} className="text-[#006D69]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-[0.2em]">Citation Display</label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 rounded-2xl bg-[#006D69]/5 cursor-pointer">
            <input type="radio" name="citations" defaultChecked className="accent-[#006D69]" />
            <span className="text-sm font-bold">Expandable "Sources" section (Recommended)</span>
          </label>
          <label className="flex items-center gap-3 p-4 rounded-2xl border border-[#006D69]/10 cursor-pointer">
            <input type="radio" name="citations" className="accent-[#006D69]" />
            <span className="text-sm font-bold">Inline reference numbers [1][2]</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function ToolsSection({ prefs, setActiveSection }: { prefs: UserPreferences, setActiveSection: (s: SettingsSection) => void }) {
  return (
    <div className="max-w-2xl space-y-8">
      <div className="p-6 rounded-3xl bg-[#006D69]/5 border border-[#006D69]/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#006D69] shadow-sm">
            <FileText size={24} />
          </div>
          <div>
            <h5 className="font-bold text-[#003636]">Document Uploads</h5>
            <p className="text-xs text-muted-foreground">Always available on all plans</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#006D69] text-[#FEFDFB] text-[8px] font-black uppercase">Active</div>
      </div>

      {[
        { title: "Ambient Scribe", desc: "Automated clinical documentation", icon: <Mic size={24} />, locked: true },
        { title: "Imaging Interpretation", desc: "X-ray interpretation workflows", icon: <ImageIcon size={24} />, locked: true },
        { title: "Chart Generation", desc: "Med list & problem extraction", icon: <Sparkles size={24} />, locked: true }
      ].map((tool, i) => (
        <button 
          key={i} 
          onClick={() => setActiveSection("plan")}
          className="w-full p-6 rounded-3xl border border-[#006D69]/10 flex items-center justify-between group hover:border-[#006D69]/30 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#006D69]/5 flex items-center justify-center text-[#006D69]/40 group-hover:text-[#006D69] transition-colors">
              {tool.icon}
            </div>
            <div>
              <h5 className="font-bold text-[#003636]">{tool.title}</h5>
              <p className="text-xs text-muted-foreground">{tool.desc}</p>
            </div>
          </div>
          {tool.locked && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#006D69]/10 text-[#006D69] text-[8px] font-black uppercase tracking-widest group-hover:bg-[#006D69] group-hover:text-white transition-all">
              <Lock size={10} /> Upgrade to Pro
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

function PlanSection({ prefs }: { prefs: UserPreferences }) {
  const plans = [
    { name: "Free", price: "$0", subtitle: "Limited access for individuals", features: ["Limited Q&A", "Upload documents", "Citations included"] },
    { name: "Plus", price: "$25", subtitle: "Full access + CME/CPD tracking", features: ["Full Q&A access", "CME/CPD tracking", "Prioritized support"] },
    { name: "Pro", price: "$79", subtitle: "Ambient scribe + advanced reasoning", features: ["Everything in Plus", "Scribe / Chart generation", "Imaging interpretation"] }
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={cn(
              "p-8 rounded-[32px] border-2 flex flex-col transition-all",
              plan.name === "Free" ? "border-[#006D69] bg-[#006D69]/5" : "border-[#006D69]/10"
            )}
          >
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-[#003636]">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-[#006D69]">{plan.price}</span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>
              <p className="text-xs font-medium text-[#006D69]/60 mt-2">{plan.subtitle}</p>
            </div>
            <div className="flex-1 space-y-3 mb-8">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-xs font-bold text-[#003636]/70">
                  <Check size={14} className="text-[#006D69]" /> {f}
                </div>
              ))}
            </div>
            <button className={cn(
              "w-full py-3 rounded-2xl font-bold text-sm transition-all",
              plan.name === "Free" ? "bg-[#003636] text-[#FEFDFB]" : "bg-[#006D69] text-[#FEFDFB] shadow-lg shadow-[#006D69]/20 hover:bg-[#003636]"
            )}>
              {plan.name === "Free" ? "Current Plan" : "Upgrade to " + plan.name}
            </button>
          </div>
        ))}
      </div>

      <div className="p-10 rounded-[40px] bg-[#003636] text-[#FEFDFB] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#006D69] rounded-full -mr-32 -mt-32 blur-[100px] opacity-40" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h5 className="text-2xl font-bold">Billing Management</h5>
            <p className="text-white/40 text-sm">Manage subscriptions, invoices, and payment methods.</p>
          </div>
          <button className="px-8 py-4 rounded-full bg-[#006D69] text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-[#006D69] transition-all">
            Manage via Stripe
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="max-w-2xl space-y-10">
      <div className="space-y-6">
        <h5 className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-[0.2em]">Email Notifications</h5>
        {[
          { label: "Product Updates", desc: "New features and improvements", defaultOn: true },
          { label: "Billing & Receipts", desc: "Essential transaction alerts", locked: true, defaultOn: true },
          { label: "Security Alerts", desc: "Account login and security notices", locked: true, defaultOn: true }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#006D69]/5 transition-all">
            <div>
              <div className="text-sm font-bold text-[#003636]">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
            <div className={cn(
              "w-12 h-6 rounded-full relative transition-all cursor-pointer",
              item.defaultOn ? "bg-[#006D69]" : "bg-[#006D69]/10"
            )}>
              <div className={cn(
                "w-4 h-4 bg-white rounded-full absolute top-1 transition-all",
                item.defaultOn ? "right-1" : "left-1"
              )} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacySection() {
  return (
    <div className="max-w-2xl space-y-10">
      <div className="space-y-6">
        <div className="p-8 rounded-3xl bg-[#006D69]/5 border border-[#006D69]/10 space-y-4">
          <div className="flex items-center gap-3 text-[#006D69]">
            <ShieldCheck size={24} />
            <h5 className="text-lg font-bold">Data Controls</h5>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your data is encrypted and stored according to HIPAA standards. You have full control over what we retain.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Save Chat History</span>
              <div className="w-12 h-6 rounded-full bg-[#006D69] relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Save Uploaded Documents</span>
              <div className="w-12 h-6 rounded-full bg-[#006D69] relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl border border-[#006D69]/10 space-y-4">
          <div className="flex items-center gap-3 text-[#003636]">
            <Trash2 size={24} className="text-red-500" />
            <h5 className="text-lg font-bold">Account Deletion</h5>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="px-6 py-3 rounded-2xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-all">
            Initiate Deletion Request
          </button>
        </div>
      </div>
    </div>
  );
}

function LegalSection() {
  const [view, setView] = useState<"menu" | "privacy" | "terms" | "hipaa" | "disclaimer" | "notices">("menu");

  if (view !== "menu") {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setView("menu")}
          className="flex items-center gap-2 text-xs font-bold text-[#006D69] hover:underline mb-4"
        >
          <ArrowLeft size={14} /> Back to Legal Hub
        </button>
        <div className="bg-white p-8 rounded-[32px] border border-[#006D69]/10 max-h-[600px] overflow-y-auto custom-scrollbar">
          {view === "privacy" && <PrivacyPolicy />}
          {view === "terms" && <TermsAndConditions />}
          {view === "hipaa" && <HIPAABAA />}
          {view === "disclaimer" && <MedicalDisclaimer />}
          {view === "notices" && <ThirdPartyNotices />}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { id: "privacy", title: "Privacy Policy", desc: "How we handle your data", icon: <Shield size={20} /> },
        { id: "terms", title: "Terms & Conditions", desc: "Service usage guidelines", icon: <FileText size={20} /> },
        { id: "hipaa", title: "HIPAA & BAA", desc: "Compliance information", icon: <ShieldCheck size={20} /> },
        { id: "disclaimer", title: "Medical Disclaimer", desc: "Clinical usage scope", icon: <AlertCircle size={20} /> },
        { id: "notices", title: "Third-party Notices", desc: "AI model & software attribution", icon: <Info size={20} /> }
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as any)}
          className="p-6 rounded-3xl border border-[#006D69]/10 hover:border-[#006D69]/40 hover:bg-[#006D69]/5 transition-all text-left group"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="text-[#006D69]/40 group-hover:text-[#006D69] transition-colors">{item.icon}</div>
            <h5 className="font-bold text-[#003636]">{item.title}</h5>
          </div>
          <p className="text-xs text-muted-foreground ml-9">{item.desc}</p>
        </button>
      ))}
    </div>
  );
}

function SupportSection() {
  return (
    <div className="max-w-2xl space-y-10">
      <div className="grid grid-cols-2 gap-4">
        <button className="p-8 rounded-[32px] bg-[#006D69]/5 border border-[#006D69]/10 flex flex-col items-center text-center gap-4 hover:bg-[#006D69]/10 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#006D69] text-white flex items-center justify-center">
            <Mail size={24} />
          </div>
          <div>
            <h5 className="font-bold text-[#003636]">Email Support</h5>
            <p className="text-[10px] text-muted-foreground">Response in &lt; 24h</p>
          </div>
        </button>
        <button className="p-8 rounded-[32px] bg-[#006D69]/5 border border-[#006D69]/10 flex flex-col items-center text-center gap-4 hover:bg-[#006D69]/10 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#003636] text-white flex items-center justify-center">
            <HelpCircle size={24} />
          </div>
          <div>
            <h5 className="font-bold text-[#003636]">Knowledge Base</h5>
            <p className="text-[10px] text-muted-foreground">Self-service help</p>
          </div>
        </button>
      </div>

      <div className="p-8 rounded-[32px] border border-[#006D69]/10 space-y-6">
        <h5 className="text-sm font-bold text-[#003636]">System Status</h5>
        <div className="space-y-4">
          {[
            { label: "Core AI Engine", status: "operational" },
            { label: "Document Processing", status: "operational" },
            { label: "Search & Citations", status: "operational" }
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#003636]/60">{s.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountSection({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-2xl space-y-10">
      <div className="space-y-6">
        <h5 className="text-[10px] font-bold text-[#006D69]/40 uppercase tracking-[0.2em]">Security</h5>
        <div className="space-y-4">
          <button className="w-full p-4 rounded-2xl border border-[#006D69]/10 flex items-center justify-between hover:bg-[#006D69]/5 transition-all">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-[#006D69]" />
              <span className="text-sm font-bold">Change Password</span>
            </div>
            <ChevronRight size={16} className="text-[#006D69]/40" />
          </button>
          <button className="w-full p-4 rounded-2xl border border-[#006D69]/10 flex items-center justify-between hover:bg-[#006D69]/5 transition-all">
            <div className="flex items-center gap-3">
              <Smartphone size={18} className="text-[#006D69]" />
              <span className="text-sm font-bold">Two-Factor Authentication</span>
            </div>
            <div className="px-2 py-1 rounded-md bg-[#006D69]/10 text-[#006D69] text-[8px] font-black uppercase">Off</div>
          </button>
        </div>
      </div>

      <div className="pt-10 border-t border-[#006D69]/10">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-all"
        >
          <LogOut size={18} /> Sign Out of All Devices
        </button>
      </div>
    </div>
  );
}
