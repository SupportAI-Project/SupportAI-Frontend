import { BaseClient } from './base.client';
import { Issue } from './types/issue';
import { UpdateIssueDto } from './types/issue';

export class IssueClient extends BaseClient {
  async getIssue() {
    return await this.get<Issue>('issues');
  }

  async updateIssue(updateIssueRequest: UpdateIssueDto) {
    return await this.patch<Issue>('issues', updateIssueRequest);
  }
}
