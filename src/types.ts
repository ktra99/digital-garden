import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Post = {
  meta: PostMeta
  content: string
}

export type PostMeta = {
  slug: string
  title: string
  tag: string
  time: string
  excerpt: string
  date: string
}

export type MDXPost = {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  meta: PostMeta;
};