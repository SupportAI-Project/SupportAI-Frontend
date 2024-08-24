import { createContext, useContext, useState } from "react";

interface GuideContextType {
  guide: string;
  setGuide: (newGuide: string) => void;
}

export const guideContext = createContext<GuideContextType | undefined>(
  undefined
);

export const GuideProvider = ({ children }: { children: React.ReactNode }) => {
  const [guide, setGuide] = useState<string>("");
  return (
    <guideContext.Provider value={{ guide, setGuide }}>
      {children}
    </guideContext.Provider>
  );
};
export const useGuideContext = () => {
  const context = useContext(guideContext);
  if (!context) {
    throw new Error("useGuideContext must be used within a GuideProvider");
  }
  return context;
};
