import { getCollection } from 'astro:content';

export const postsPerPage = 6;
export const postUrl = (id: string) => `/post/${id}/`;
export const archiveUrl = (page: number) => page === 1 ? '/blog/' : `/blog/${page}/`;
export async function getPosts() {
  return (await getCollection('posts')).sort((a, b) =>
    b.data.createdAt.localeCompare(a.data.createdAt) || a.id.localeCompare(b.id));
}
