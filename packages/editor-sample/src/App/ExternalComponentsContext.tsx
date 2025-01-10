/* eslint-disable @typescript-eslint/no-explicit-any */
// ExternalComponentsContext.tsx
import React, { createContext, useContext } from 'react';

interface ExternalComponents {
  VariableInput: React.ComponentType<any>;
}

const ExternalComponentsContext = createContext<ExternalComponents | null>(null);

export function useExternalComponents() {
  const context = useContext(ExternalComponentsContext);
  if (!context) {
    throw new Error('useExternalComponents must be used within an ExternalComponentsProvider');
  }
  return context;
}

interface ExternalComponentsProviderProps {
  children: React.ReactNode;
  components: ExternalComponents;
}

export function ExternalComponentsProvider({ children, components }: ExternalComponentsProviderProps) {
  return <ExternalComponentsContext.Provider value={components}>{children}</ExternalComponentsContext.Provider>;
}
