import Head from 'next/head';
import {getPost,getSlugs} from '../../lib/posts';

export async function getStaticPaths() {
    const slugs = await getSlugs();
    return {
        paths: slugs.map((slug) => ({
            params: {slug}
        })),
        fallback: false,
    }
}


// only runs on SERVER SIDE
export async function getStaticProps({params: {slug}}) {
    console.log('getStaticProps', slug)
    const post = await getPost(slug);
    return {
        props: {post}
    }
}

// executed by server and browser
function Post({post}) {
    console.log('props', post)
    return (
        <>
        <Head>
            <title>{post.title}</title>
        </Head>
        <main>
        <div>
            <p>{post.date}</p>
            <h1>{post.title}</h1>
            <article dangerouslySetInnerHTML={{__html: post.body}} />
        </div>
        </main>
        </>
    )
}

export default Post;