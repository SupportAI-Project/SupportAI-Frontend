import { BaseClient } from './base.client';
import { Guide } from './types/Guide';
import { Review } from './types/Review';

export class GuideClient extends BaseClient {
  async getAllGuides() {
    const response = await this.get<Guide[]>('guides');
    if('error' in response) {
      return response;
    }
    return response.data;
  }

  async getReviews(guideId: number) {
    const response = await this.get<Review[]>('reviews/guide/' + guideId);
    if('error' in response) {
      return response;
    }
    return response.data;
  }
}
