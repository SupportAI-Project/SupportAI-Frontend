import { z } from 'zod';

export const issueSchema = z.object({
  id: z.number(),
  categories: z.array(z.string()),
  singletonKey: z.number().default(1),
});

export const updateIssueDtoSchema = z.object({
  categories: z.array(z.string()),
});

export type UpdateIssueDto = z.infer<typeof updateIssueDtoSchema>;

export type Issue = z.infer<typeof issueSchema>;