import { BaseClient } from "./base.client";
import {
  ModelCreateGuideRequest,
  ModelCreateGuideResponse,
} from "./types/model";

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
