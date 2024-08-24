import { BaseClient } from "./base.client";

export class ModelClient extends BaseClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_MODEL_AI_URL!);
  }
  createGuide(modelCreateGuideRequest: ModelCreateGuideRequest) {
    return this.post<ModelCreateGuideResponse>(
      "openai/generate-guide",
      modelCreateGuideRequest
    );
  }
}
