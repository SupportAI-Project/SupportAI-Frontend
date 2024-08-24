import { ChatClient } from "@/api/chat.client";
import { ModelClient } from "@/api/model.client";
import { guideContext, useGuideContext } from "@/app/providers/guide";
import { ClientResponse, SuccessResponse } from "@/types";
import { useRouter } from "next/navigation";
import { Chat, User } from "../types/index";

export const useGuide = () => {
  const router = useRouter();
  const { setGuide } = useGuideContext();

  async function handleGenerateGuide(chatId: number): Promise<void> {
    const chatModel = new ChatClient();
    const clientResponse = (await chatModel.chatById({
      id: chatId,
    })) as ClientResponse<Chat>;
    const successResponse = clientResponse as SuccessResponse<Chat>;
    const chat = successResponse.data as Chat;

    const modelClient = new ModelClient();
    const response = (await modelClient.createGuide({
      user: chat.user,
      messages: chat.messages,
    })) as ClientResponse<ModelCreateGuideResponse>;

    const modelCreateGuideResponse =
      response as SuccessResponse<ModelCreateGuideResponse>;
    setGuide(modelCreateGuideResponse.data);
    router.push("new_dashboard/guides/create");
  }

  return {
    handleGenerateGuide,
  };
};
