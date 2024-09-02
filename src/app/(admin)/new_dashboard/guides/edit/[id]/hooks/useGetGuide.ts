import { Guide } from "@/api/types/Guide";
import { useOnFetch } from "@/common/hooks/useOnFetch";
import { useGuide } from "@/hooks";
import { ClientResponse, SuccessResponse } from "@/types";
import { useState } from "react";

export const useGetGuide = (id: number) => {
  const { data, isError, error, isLoading } = useGuide(id);
  const [guide, setGuide] = useState<Guide>();

  useOnFetch(
    (clientResponse: ClientResponse<Guide>) => {
      if (isError) {
        throw error;
      } else {
        const successResponse = clientResponse as SuccessResponse<Guide>;
        setGuide(successResponse.data);
      }
    },
    !!data || isError,
    data
  );

  return { guide, isLoading };
};
