import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext } from "react";

interface ApplicationContextType {
  application: string
  setApplication: Dispatch<SetStateAction<string | undefined>>
  allApplications: string[]
}

interface Props extends ApplicationContextType{
  children: ReactNode
}

const ApplicationCtx = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children, application, setApplication, allApplications }: Props) =>
  <ApplicationCtx.Provider value={{ application, setApplication, allApplications }}>
    {children}
  </ApplicationCtx.Provider>

export const useApplicationContext = (): ApplicationContextType => {
  const context = useContext(ApplicationCtx);
  if (context === undefined) {
    throw new Error("Error with useApplicationContext hook");
  }
  return context;
};
