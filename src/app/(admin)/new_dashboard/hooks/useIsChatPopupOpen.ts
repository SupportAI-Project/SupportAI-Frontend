import { useState } from "react";

export const useIsChatPopupOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};
