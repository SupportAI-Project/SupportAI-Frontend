import { BaseClient } from "./base.client";
import { CreateReviewRequest, Review } from "./types/Review";

export class ReviewClient extends BaseClient {
  async getReviews(guideId: number) {
    return await this.get<Review[]>("reviews/guide/" + guideId);
  }

  async addReview(review: CreateReviewRequest) {
    return await this.post<Review>("reviews", review);
  }
}
