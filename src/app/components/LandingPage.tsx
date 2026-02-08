import React from "react";
import { UserTrack } from "../App";
import { motion } from "motion/react";
import { ArrowRight, Microscope, Building2, UserCircle } from "lucide-react";
import logo from "figma:asset/7ead5bbd9cde88ca88371c59497728d3e616cec5.png";
import icon from "figma:asset/3da064fd6e11f40c1af37ff2004ac42f0b002ce3.png";

interface LandingPageProps {
  onStartApp: (track: UserTrack) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApp }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <img src={logo} alt="EvidenceMD" className="h-8 w-auto hidden sm:block" />
        <img src={icon} alt="EvidenceMD" className="h-16 w-16 sm:hidden object-contain" />
        <nav className="flex gap-4 sm:gap-8 text-sm font-medium items-center">
          <a href="#" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#" className="hover:text-primary transition-colors">Resources</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          <button 
            onClick={() => onStartApp("clinical")}
            className="px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold"
          >
            Sign In
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto w-full py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            Clinical intelligence, <br />
            <span className="italic text-primary">editorial precision.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            EvidenceMD is a clinical reasoning engine built for the rigor of high-end medical journals. 
            Choose your path to begin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer overflow-hidden"
            onClick={() => onStartApp("clinical")}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Microscope size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Use the App</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Tailored for clinicians, administrators, and patients. Start reasoning with citations instantly.
              </p>
              <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
                Enter Workspace <ArrowRight size={18} />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group relative p-8 rounded-2xl border border-border bg-ink text-white hover:shadow-xl hover:shadow-ink/20 transition-all cursor-pointer overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Building2 size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Use the API</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Integrate clinical reasoning into your own products. Access structured, cited medical data.
              </p>
              <div className="flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all">
                Get API Key <ArrowRight size={18} />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-125">
          <div className="text-xl font-bold italic">NEJM Group</div>
          <div className="text-xl font-bold italic">The Lancet</div>
          <div className="text-xl font-bold italic">JAMA</div>
          <div className="text-xl font-bold italic">BMJ</div>
        </div>
      </main>

      <footer className="mt-auto py-12 bg-ink text-white/40 text-sm">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <img src={icon} alt="EvidenceMD" className="h-8 w-auto brightness-0 invert opacity-60 grayscale" />
            <span>&copy; 2026 Editorial Group</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
