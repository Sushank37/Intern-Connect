import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WizardContextType {
  isOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openWizard = () => setIsOpen(true);
  const closeWizard = () => setIsOpen(false);

  return (
    <WizardContext.Provider value={{ isOpen, openWizard, closeWizard }}>
      {children}
    </WizardContext.Provider>
  );
};