import { useState } from "react";
import { useRouter } from "next/navigation";
import { GuidesClient } from "@/api/guides.client";

export const useCreateGuide = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const guidesClient = new GuidesClient();

  const handleSave = async (
    title: string,
    issue: string,
    contentHTML: string
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await guidesClient.createGuide({ title, contentHTML });
      console.log("Guide created successfully:", response);
      setSuccess(true);
      router.push("/new_dashboard/guides");
    } catch (err) {
      console.error("Failed to create guide:", err);
      setError("Failed to create guide. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSave, isLoading, error, success };
};
