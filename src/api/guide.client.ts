import { CreateReviewDto } from '@/app/(admin)/new_dashboard/guides/dto/CreateReviewDto';
import { BaseClient } from './base.client';
import { Guide } from './types/Guide';
import { Review } from './types/Review';

export class GuideClient extends BaseClient {
  async getAllGuides() {
    return await this.get<Guide[]>('guides');
  }

  async getReviews(guideId: number) {
    return await this.get<Review[]>('reviews/guide/' + guideId);
  }

  async getGuide(guideId: number) {
    return await this.get<Guide>('guides/' + guideId);
  }
  
  async addReview(review:CreateReviewDto) {
    return await this.post<Review>('reviews', review);
  }
}
