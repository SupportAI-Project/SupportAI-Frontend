export type Guide = {
  guideId: number;
  title: string;
  issue: string;
  likes: number;
  dislikes: number;
};

export type GuideResponse = Guide;

export interface ErrorResponse {
  message: string;
}
