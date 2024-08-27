import { ChatClient } from "@/api/chat.client";
import { ModelClient } from "@/api/model.client";
import { useGuideContext } from "@/app/providers/guide";
import { SuccessResponse, ErrorResponse, isSuccessResponse } from "@/types";
import { useRouter } from "next/navigation";
import { Chat } from "@/api/types/chat";
import { ModelCreateGuideResponse } from "@/api/types/model";

const modelClient = new ModelClient();
const chatModel = new ChatClient();

export const useGuide = () => {
  const router = useRouter();
  const { setGuide } = useGuideContext();

  async function handleGenerateGuide(chatId: number): Promise<void> {
    const chatResponse = await chatModel.chatById({
      id: chatId,
    });

    if (!isSuccessResponse(chatResponse)) {
      const errorResponse = chatResponse as ErrorResponse;
      console.error(errorResponse.error);
      return;
    }
    const chat = (chatResponse as SuccessResponse<Chat>).data;

    const modelCreateGuideResponse = await modelClient.createGuide({
      user: {
        roles: chat.user.roles,
        username: chat.user.username,
      },
      messages: chat.messages.map((message) => ({
        content: message.content,
        isSupportSender: message.isSupportSender,
      })),
    });

    if (!isSuccessResponse(modelCreateGuideResponse)) {
      const errorResponse = modelCreateGuideResponse as ErrorResponse;
      console.error(errorResponse.error);
      return;
    }

    const guideResponse = (
      modelCreateGuideResponse as SuccessResponse<ModelCreateGuideResponse>
    ).data;
    setGuide(guideResponse);
    router.push("new_dashboard/guides/create");
  }

  return {
    handleGenerateGuide,
  };
};
