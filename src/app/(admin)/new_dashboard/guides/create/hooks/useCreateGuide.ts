export const useCreateGuide = () => {
  const handleSave = (content: string) => {
    console.log("Saving new guide:", content);
  };

  return { handleSave };
};
