import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GuideContextType {
  guide: Guide | undefined;
  setGuide: Dispatch<SetStateAction<Guide | undefined>>;
}

type Guide = {
  title: string;
  contentHTML: string;
};

export const guideContext = createContext<GuideContextType | undefined>(
  undefined
);

export const GuideProvider = ({ children }: { children: React.ReactNode }) => {
  const [guide, setGuide] = useState<Guide | undefined>(undefined);
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
