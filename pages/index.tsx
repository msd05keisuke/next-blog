import { GetStaticProps } from 'next';
import Link from 'next/link';

import { client } from '../libs/client';
import { Blog } from '../types/blog';

type Props = {
  blogs: Blog[];
};

const Home = ({ blogs }: Props) => {
  return (
    <div>
      <div>HOGE</div>
      <ul>
        {blogs.map((blog: Blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// APIから取得したデータをテンプレートに受け渡す(SSGの際に利用)
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });
  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;
