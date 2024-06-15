import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext } from "react";

interface ExcludeContextType {
  excludeBots: boolean
  setExcludeBots: Dispatch<SetStateAction<boolean>>
}

interface Props extends ExcludeContextType{
  children: ReactNode
}

const ExcludeContext = createContext<ExcludeContextType | undefined>(undefined);

export const ExcludeProvider = ({ children, excludeBots, setExcludeBots }: Props) => 
  <ExcludeContext.Provider value={{ excludeBots, setExcludeBots }}>
    {children}
  </ExcludeContext.Provider>

export const useExcludeContext = (): ExcludeContextType => {
  const context = useContext(ExcludeContext);
  if (context === undefined) {
    throw new Error("Error with useExcludeContext hook");
  }
  return context;
};
