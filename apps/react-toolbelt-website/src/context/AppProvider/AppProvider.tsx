'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch
} from 'react';

import {
  useScroll,
  useResize,
  ScrollDirection,
  ScrollValues,
  ElementSize
} from '@react-toolbelt/hooks';
import { isServer } from '@react-toolbelt/utils';

/** App Settings */
interface Settings {
  theme: 'dark' | 'light' | 'system';
  scroll: {
    direction: ScrollDirection;
    values: ScrollValues;
  };
  windowSize: ElementSize;
}

interface AppProviderProps {
  children?: ReactNode;
  defaultValue?: Settings;
}

type InputProps = {
  [K in keyof Settings as K]?: Settings[K];
};

const DEFAULTS: Settings = {
  theme: 'system',
  scroll: {
    direction: {
      x: 'left',
      y: 'up'
    },
    values: {
      x: 0,
      y: 0
    }
  },
  windowSize: {
    width: isServer() ? 0 : window.innerWidth,
    height: isServer() ? 0 : window.innerHeight
  }
};

export const AppContext = createContext<{
  settings: Settings;
  updateSettings?: Dispatch<SetStateAction<Settings>>;
}>({ settings: DEFAULTS });

export const AppProvider = ({ children, defaultValue }: AppProviderProps) => {
  const [settings, updateSettings] = useState(
    defaultValue && Object.keys(defaultValue).length > 0
      ? defaultValue
      : DEFAULTS
  );

  /** Update scroll */
  useScroll(undefined, (direction, values) =>
    updateSettings((prev) => ({
      ...prev,
      scroll: { direction, values }
    }))
  );

  /** Update windowSize */
  useResize(undefined, (size) =>
    updateSettings((prev) => ({ ...prev, windowSize: size }))
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
