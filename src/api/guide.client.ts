import { CreateReviewDto } from "@/app/(admin)/new_dashboard/guides/dto/CreateReviewDto";
import { BaseClient } from "./base.client";
import { CreateGuideRequest, Guide, UpdateGuideRequest } from "./types/Guide";
import { Review } from "./types/Review";

export class GuideClient extends BaseClient {
  async getAllGuides() {
    return await this.get<Guide[]>("guides");
  }

  async getGuide(guideId: number) {
    return await this.get<Guide>("guides/" + guideId);
  }

  async createGuide(createGuideRequest: CreateGuideRequest) {
    return await this.post<Guide>("guides", createGuideRequest);
  }

  async updateGuide(updateGuideRequest: UpdateGuideRequest) {
    return await this.patch<Guide>("guides/" + updateGuideRequest.id, {
      title: updateGuideRequest.title,
      contentHTML: updateGuideRequest.contentHTML,
      categories: updateGuideRequest.categories,
    });
  }

  async deleteGuide(guideId: number) {
    return await this.delete("guides/" + guideId);
  }
}
