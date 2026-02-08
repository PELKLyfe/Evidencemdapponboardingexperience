import React from "react";
import { UserPreferences } from "../App";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Upload, 
  File, 
  Trash2, 
  Zap,
  CheckCircle2,
  Lock,
  Stethoscope,
  Image as ImageIcon,
  FileText
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AttachmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  preferences: UserPreferences;
}

export const AttachmentDrawer: React.FC<AttachmentDrawerProps> = ({ 
  isOpen, 
  onClose, 
  files, 
  setFiles,
  preferences
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles.map(f => ({ name: f.name, size: f.size, status: "ready" }))]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Attachments</h2>
                <p className="text-[10px] font-bold text-muted-foreground">Universal uploads</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Upload Area */}
              <div className="relative group">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-muted/20 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm">Click or drag to upload</p>
                    <p className="text-[11px] text-muted-foreground">PDF, JPG, PNG, DICOM (Max 10MB)</p>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-bold text-muted-foreground">Files ({files.length})</span>
                    <button 
                      onClick={() => setFiles([])}
                      className="text-[10px] font-bold text-destructive hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                          <File size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{file.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <span className="text-[10px] text-primary font-bold flex items-center gap-0.5">
                              <CheckCircle2 size={10} /> Ready
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFile(i)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Actions */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-muted-foreground px-1">Available actions</span>
                
                <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary transition-all text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">Ask about these files</h4>
                    <p className="text-[11px] text-muted-foreground">Search and synthesize insights</p>
                  </div>
                  <CheckCircle2 size={18} className="text-primary" />
                </button>

                <div className="relative group">
                  <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 transition-all text-left opacity-70">
                    <div className="w-10 h-10 rounded-lg bg-ink/10 flex items-center justify-center text-ink">
                      <Stethoscope size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold">Generate chart note</h4>
                        <Lock size={12} className="text-muted-foreground" />
                      </div>
                      <p className="text-[11px] text-muted-foreground">Turn uploads into a structured note</p>
                    </div>
                  </button>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-[1px] rounded-xl">
                    <button className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg shadow-lg">
                      Upgrade to clinician
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 transition-all text-left opacity-70">
                    <div className="w-10 h-10 rounded-lg bg-ink/10 flex items-center justify-center text-ink">
                      <ImageIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold">Analyze X-ray</h4>
                        <Lock size={12} className="text-muted-foreground" />
                      </div>
                      <p className="text-[11px] text-muted-foreground">Automated findings extraction</p>
                    </div>
                  </button>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-[1px] rounded-xl">
                    <button className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg shadow-lg">
                      Upgrade to clinician
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/10">
              <button 
                disabled={files.length === 0}
                className="w-full p-4 bg-ink text-white rounded-xl font-bold hover:bg-ink/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Start Reasoning <Zap size={18} className="text-primary fill-primary" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
