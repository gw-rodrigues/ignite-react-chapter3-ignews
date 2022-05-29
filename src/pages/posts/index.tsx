import { GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
  };
  
  interface PostsProps {
    posts: Post[];
  }

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ig.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {
              posts.map((post)=>{
                return (
                    <a key={post.slug} href="#">
                        <time>{post.updatedAt}</time>
                        <strong>{post.title}</strong>
                        <p>{post.excerpt}</p>
                    </a>
                )
              })
          }
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const pages = await client.getAllByType("posts", {
    fetchLinks: ["posts.title", "posts.content"],
    pageSize: 100,
  });

  const posts = pages.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content:any) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  //console.log(JSON.stringify(pages, null, 2));

  return {
    props: { posts }
  };
};
