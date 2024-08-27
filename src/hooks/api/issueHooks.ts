import { IssueClient } from "@/api/issue.client";
import { UpdateIssueDto } from "@/api/types/issue";
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
    mutationFn: (data: UpdateIssueDto) => issueClient.updateIssue(data),
  });
}
