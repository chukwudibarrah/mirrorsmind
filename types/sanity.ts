// types/sanity.ts
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityPage {
  _key: string;
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  caption?: string;
  alt?: string;
}

export interface SanityIssue {
  _id: string;
  title?: string;
  coverImage?: SanityImageSource;
  views?: number;
  pages?: SanityPage[];
}
