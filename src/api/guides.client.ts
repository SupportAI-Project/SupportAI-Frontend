import { GuideResponse } from "../app/(admin)/new_dashboard/guides/types";
import { BaseClient } from "./base.client";
import axios from "axios";

export class GuidesClient extends BaseClient {
  async createGuide<T>(guideData: any) {
    return this.post<T>("guides", guideData);
  }

  async getGuides() {
    return this.get<GuideResponse[]>("guides");
  }

  async getGuideById(guideId: string) {
    return this.get<GuideResponse>(`guides/${guideId}`);
  }
}
