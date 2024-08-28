import { BaseClient } from "./base.client";
import { UpdateIssueRequest, Issue } from "./types/Issue";

export class IssueClient extends BaseClient {
  async getIssue() {
    return await this.get<Issue>("issues");
  }

  async updateIssue(updateIssueRequest: UpdateIssueRequest) {
    return await this.patch<Issue>("issues", updateIssueRequest);
  }
}
