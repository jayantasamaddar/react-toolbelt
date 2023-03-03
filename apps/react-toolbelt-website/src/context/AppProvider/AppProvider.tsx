'use client';

import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch
} from 'react';

/** App Settings */
interface Settings {
  theme?: 'dark' | 'light' | 'system';
}

interface AppProviderProps {
  children?: ReactNode;
  defaultValue?: Settings;
}

type InputProps = {
  [K in keyof Settings as K]?: Settings[K];
};

export const AppContext = createContext<{
  settings?: Settings;
  updateSettings?: Dispatch<SetStateAction<Settings>>;
}>({});

export const AppProvider = ({ children, defaultValue }: AppProviderProps) => {
  const [settings, updateSettings] = useState<Settings>(
    defaultValue && Object.keys(defaultValue).length > 0
      ? defaultValue
      : {
          theme: 'system'
        }
  );

  return (
    <AppContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (input?: InputProps) => {
  const { settings, updateSettings } = useContext(AppContext);
  if (!input) return { settings, updateSettings };
  else updateSettings && updateSettings((prev) => ({ ...prev, ...input }));
  return { settings, updateSettings };
};
