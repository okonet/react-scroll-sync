import { createContext, useContext } from 'react';

export interface ScrollSyncContextValue {
  registerPane: (node: HTMLElement, groups: string[]) => void;
  unregisterPane: (node: HTMLElement, groups: string[]) => void;
}

const ScrollSyncContext = createContext<ScrollSyncContextValue | undefined>(undefined);

const useScrollSyncContext = (): ScrollSyncContextValue => {
    const context = useContext(ScrollSyncContext);
    if (!context) {
      throw new Error('useScrollSyncContext must be used within a ScrollSyncProvider');
    }
    return context;
  };

export { ScrollSyncContext, useScrollSyncContext };
