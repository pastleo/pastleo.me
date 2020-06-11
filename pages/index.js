import classnames from 'classnames';
import Link from 'next/link';

import PostBanner from '../components/PostBanner.js';

import withLayout from '../layouts/index.js';
import HomeLayout, { styles as layoutStyles } from '../layouts/HomeLayout.js';

const Index = ({ posts }) => (
  <>
    { posts.map(post => (
      <Link key={post.slug} href={`/posts/${post.slug}`}>
        <a className={layoutStyles.noHoverEffect}>
          <PostBanner {...post.options} titleClassName='text-3xl' />
        </a>
      </Link>
    )) }
  </>
);

export default withLayout({
  Layout: HomeLayout,
})(Index);

export const getStaticProps = async() => {
  const { getPosts } = await import('../node/posts.js');
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};
