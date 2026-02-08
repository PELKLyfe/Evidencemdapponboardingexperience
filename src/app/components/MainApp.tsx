import React, { useState } from "react";
import { UserPreferences } from "../App";
import { Sidebar } from "./Sidebar";
import { ChatInterface } from "./ChatInterface";
import { SettingsModal } from "./SettingsModal";
import { AttachmentDrawer } from "./AttachmentDrawer";
import { AnimatePresence } from "motion/react";

interface MainAppProps {
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const MainApp: React.FC<MainAppProps> = ({ preferences, updatePreferences }) => {
  const [activeModule, setActiveModule] = useState<"ask" | "scribe" | "imaging">("ask");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAttachmentDrawerOpen, setIsAttachmentDrawerOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        preferences={preferences}
      />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <ChatInterface 
          preferences={preferences} 
          activeModule={activeModule}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAttachments={() => setIsAttachmentDrawerOpen(true)}
          files={files}
        />
        
        <AnimatePresence>
          {isSettingsOpen && (
            <SettingsModal 
              preferences={preferences} 
              onClose={() => setIsSettingsOpen(false)} 
              onUpdate={updatePreferences}
            />
          )}
        </AnimatePresence>

        <AttachmentDrawer 
          isOpen={isAttachmentDrawerOpen} 
          onClose={() => setIsAttachmentDrawerOpen(false)}
          files={files}
          setFiles={setFiles}
          preferences={preferences}
        />
      </main>
    </div>
  );
};
