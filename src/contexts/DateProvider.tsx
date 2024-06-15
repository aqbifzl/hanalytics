import { type Dayjs } from "dayjs";
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext } from "react";

interface DateContextType {
  boundary: Dayjs;
  setBoundary: Dispatch<SetStateAction<Dayjs>>
  now: Dayjs;
  setNow: Dispatch<SetStateAction<Dayjs>>
}

interface Props extends DateContextType{
  children: ReactNode
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children, boundary, setBoundary, now, setNow }: Props) => 
  <DateContext.Provider value={{ boundary, setBoundary, now, setNow }}>
    {children}
  </DateContext.Provider>

export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("Error with useDateContext hook");
  }
  return context;
};
