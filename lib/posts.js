import {readFile, readdir} from 'fs/promises';
import {marked} from 'marked';
import matter from 'gray-matter';
export async function getPost(slug) {
    const source = await readFile(`content/posts/${slug}.md`, 'utf-8');
    const {data: {date, title},content} = matter(source);
    const body = marked(content);
    return {
        title,
        date,
        body
    }
}
export async function getPosts() {
  const slugs = await getSlugs();
  const posts = [];
  for(const slug of slugs) {
    const post = await getPost(slug);
    posts.push({...post, slug})
  }  
  return posts;
}

export async function getSlugs() {
    const suffix = '.md';
    const files = await readdir('content/posts');
    files.filter((file) => {
        file.substr(-3) === suffix
    });
    return files.map((file) => file.slice(0,-3));
}