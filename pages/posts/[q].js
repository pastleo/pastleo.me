import classnames from 'classnames';
import Link from 'next/link';

import withLayout from '../../layouts/index.js';
import { styles as layoutStyles } from '../../layouts/HomeLayout.js';

import PostBanner from '../../components/PostBanner.js';
import Pagination from '../../components/Pagination.js';

const Posts = ({ posts, currentPage, totalPages }) => (
  <>
    { posts.map(post => (
      <Link key={post.slug} href={`/post/${post.slug}`}>
        <a className={layoutStyles.noHoverEffect}>
          <PostBanner {...post.options} className='my-5' contentClassName='p-5' titleClassName='text-3xl' />
        </a>
      </Link>
    )) }
    <Pagination currentPage={currentPage} totalPages={totalPages} />
  </>
);

export default withLayout()(Posts);

export const getStaticProps = async({ params: { q: query } }) => {
  const posts = await import('../../lib/node/posts.js');
  const { page } = posts.parseQuery(query);
  return {
    props: {
      posts: await posts.page(page),
      currentPage: page,
      totalPages: await posts.totalPages(),
    },
  };
};

export const getStaticPaths = async() => {
  const posts = await import('../../lib/node/posts.js');
  return {
    paths: [
      ...(await posts.genQueryPaths()),
    ],
    fallback: false,
  };
};
