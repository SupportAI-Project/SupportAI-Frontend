import { CreateReviewDto } from "@/app/(admin)/new_dashboard/guides/dto/CreateReviewDto";
import { BaseClient } from "./base.client";
import { Guide, GuideRequestUpdate } from "./types/Guide";
import { Review } from "./types/Review";

export class GuideClient extends BaseClient {
  async getAllGuides() {
    return await this.get<Guide[]>("guides");
  }

  async getGuide(guideId: number) {
    return await this.get<Guide>("guides/" + guideId);
  }

  async deleteGuide(guideId: number) {
    return await this.delete<Guide>("guides/" + guideId);
  }

  async addReview(review: CreateReviewDto) {
    return await this.post<Review>("reviews", review);
  }

  async updateGuide(id: number, guide: GuideRequestUpdate) {
    return await this.patch<Guide>("guides/" + id, guide);
  }
}
