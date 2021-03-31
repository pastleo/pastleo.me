import Link from 'next/link';

import withLayout from '../../layouts/index.js';

import PostBanner from '../../components/PostBanner.js';
import Pagination from '../../components/Pagination.js';

import * as postsData from '../../lib/node/posts.js';

const Posts = ({ posts, currentPage, totalPages }) => (
  <div className='max-w-screen-lg mx-auto'>
    { posts.map(post => (
      <Link key={post.slug} href={`/post/${post.slug}`}>
        <a>
          <PostBanner {...post.options} className='my-5' contentClassName='p-5' titleClassName='text-xl md:text-3xl' />
        </a>
      </Link>
    )) }
    <Pagination currentPage={currentPage} totalPages={totalPages} />
  </div>
);

export default withLayout()(Posts);

export const getStaticProps = async ({ params: { q: query } }) => {
  const { page } = postsData.parseQuery(query);
  return {
    props: {
      posts: await postsData.page(page),
      currentPage: page,
      totalPages: await postsData.totalPages(),
    },
  };
};

export const getStaticPaths = async () => ({
  paths: [
    ...(await postsData.genQueryPaths()),
  ],
  fallback: false,
});
