import { Post } from "@src/types"
import fs from "fs"
import { sync } from "glob"
import matter from "gray-matter"
import path from "path"

const POSTS_PATH = path.join(process.cwd(), "/src/posts");

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.mdx`)
  return paths.map((path) => {
    const parts = path.split("/")
    const filename = parts[parts.length - 1]
    const [slug] = filename.split(".mdx")
    return slug
  })
}

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(postPath)
  const { content, data } = matter(source)

  return{
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? "",
      tag: data.tag ?? "",
      date: data.date ?? new Date().toString()
    }
  }
}

export const getAllPosts = () => {
  const posts = getSlugs().map((slug) => getPostFromSlug(slug)).sort((a, b) => {
    if(a.meta.date > b.meta.date) return 1
    if(a.meta.date < b.meta.date) return -1
    return 0
  }).reverse()
  return posts
}