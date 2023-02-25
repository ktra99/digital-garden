import { MDXRemoteSerializeResult } from "next-mdx-remote";

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