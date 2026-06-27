import { create } from 'zustand';

interface AppStore {
  recruiterMode: boolean;
  activeSection: string;
  terminalHistory: string[];
  incidentActive: boolean;
  setRecruiterMode: (val: boolean) => void;
  setActiveSection: (section: string) => void;
  addTerminalCommand: (cmd: string) => void;
  setIncidentActive: (val: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  recruiterMode: false,
  activeSection: 'hero',
  terminalHistory: [],
  incidentActive: false,
  setRecruiterMode: (val) => set({ recruiterMode: val }),
  setActiveSection: (section) => set({ activeSection: section }),
  addTerminalCommand: (cmd) => set((state) => ({ terminalHistory: [...state.terminalHistory, cmd] })),
  setIncidentActive: (val) => set({ incidentActive: val }),
}));
