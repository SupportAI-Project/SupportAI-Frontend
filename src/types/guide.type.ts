export interface Guide {
  contentHTML: string | TrustedHTML;
  guideId:
    | string
    | number
    | boolean
    | readonly string[]
    | readonly number[]
    | readonly boolean[]
    | null
    | undefined;
  id:
    | string
    | number
    | boolean
    | readonly string[]
    | readonly number[]
    | readonly boolean[]
    | null
    | undefined;
  title: string;
  content: string;
  creationDate: string;
}
