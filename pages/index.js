import Link from 'next/link';

import withLayout from '../layouts/index.js';
import HomeLayout from '../layouts/HomeLayout.js';

import PostBanner from '../components/PostBanner.js';
import Pagination from '../components/Pagination.js';

const currentPage = 0;

const Index = ({ posts, totalPages }) => (
  <div className='max-w-screen-lg mx-auto'>
    { posts.map(post => (
      <Link key={post.slug} href={`/post/${post.slug}`}>
        <a>
          <PostBanner {...post.options} className='my-5' contentClassName='p-5' titleClassName='text-3xl' />
        </a>
      </Link>
    )) }
    <Pagination currentPage={currentPage} totalPages={totalPages} />
  </div>
);

export default withLayout({
  Layout: HomeLayout,
})(Index);

export const getStaticProps = async () => {
  const posts = await import('../lib/node/posts.js');
  return {
    props: {
      posts: await posts.page(currentPage),
      totalPages: await posts.totalPages(),
    },
  };
};
