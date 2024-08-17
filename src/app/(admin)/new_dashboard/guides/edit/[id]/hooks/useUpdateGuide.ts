export const useUpdateGuide = () => {
  const handleSave = (content: string) => {
    console.log("Saving new guide:", content);
  };

  return { handleSave };
};
