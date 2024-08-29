import { IssueClient } from "@/api/issue.client";
import { UpdateIssueRequest } from "@/api/types/Issue";
import { useQuery, useMutation } from "@tanstack/react-query";

const issueClient = new IssueClient();

export function useIssue() {
  return useQuery({
    queryKey: ["issue"],
    queryFn: () => issueClient.getIssue(),
  });
}

export function useUpdateIssue() {
  return useMutation({
    mutationFn: (data: UpdateIssueRequest) => issueClient.updateIssue(data),
  });
}
