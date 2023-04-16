import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { client } from "@/src/libs/client";
import { Blog } from "@/src/types/blog";

const BlogId: NextPage<Blog> = (blog) => {

    return (
        <main>
            <h1>{blog.title}</h1>
            <p>{blog.publishedAt}</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: `${blog.body}`,
                }}
            />
        </main>
    )
}

// 動的ルーティング時に利用
export const getStaticPaths: GetStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });
    const paths = data.contents.map((blog: Blog) => `/blog/${blog.id}`);
    return { paths, fallback: false };
};

// getStaticPathsでreturnしたpaths内のオブジェクトを引数contextから参照
export const getStaticProps = async (
    context: GetStaticPropsContext<{ id: string }>
) => {
    console.log(context.params)
    const id = context.params?.id;
    const data = await client.get({ endpoint: "blog", contentId: id });
    return {
        props: data,
    };
};

export default BlogId;