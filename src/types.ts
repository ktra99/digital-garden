import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface ConsentParams {
  ad_storage?: "granted" | "denied" | undefined;
  analytics_storage?: "granted" | "denied" | undefined;
  wait_for_update?: number | undefined;
  region?: string[] | undefined;
  personalization_storage: "granted" | "denied" | undefined;
}

export type Post = {
  meta: PostMeta
  content: string
}

export type Slugs = {
  en: string
  sv: string
}

export type PostMeta = {
  slug: string
  title: string
  tag: string
  slugs: Slugs
  excerpt: string
  date: Date
  locale: string
}

export type MDXPost = {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  meta: PostMeta;
};