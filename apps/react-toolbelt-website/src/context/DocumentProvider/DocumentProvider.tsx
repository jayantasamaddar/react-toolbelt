'use client';

import { NavigationItem } from '@/types';
import { usePathname } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback
} from 'react';

/** Document Page DocumentSettings */
interface DocumentSettings {
  path: string | null;
  headings?: NavigationItem[];
}

interface DocumentProviderProps {
  children?: ReactNode;
  defaultValue?: DocumentSettings;
}

const DEFAULTS: DocumentSettings = {
  path: ''
};

type InputProps = {
  [K in keyof DocumentSettings as K]?: DocumentSettings[K];
};

export const DocumentContext = createContext<{
  data: DocumentSettings;
  setData?: Dispatch<SetStateAction<DocumentSettings>>;
}>({ data: DEFAULTS });

export const DocumentProvider = ({
  children,
  defaultValue = DEFAULTS
}: DocumentProviderProps) => {
  const [data, setData] = useState<DocumentSettings>(defaultValue);

  return (
    <DocumentContext.Provider value={{ data, setData }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = (input?: InputProps) => {
  const { data, setData } = useContext(DocumentContext);
  if (!input) return { data, setData };
  else setData && setData((prev) => ({ ...prev, ...input }));
  return { data, setData };
};
