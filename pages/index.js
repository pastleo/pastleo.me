import classnames from 'classnames';
import Link from 'next/link';

import styles from '../styles/pages/index.scss';

import withLayout from '../layouts/index.js';
import HomeLayout, { styles as layoutStyles } from '../layouts/HomeLayout.js';

const Index = ({ posts }) => (
  <>
    { posts.map(post => (
      <Link key={post.slug} href={`/posts/${post.slug}`}>
        <a className={classnames(styles.postLink, layoutStyles.noHoverEffect, 'block max-w-screen-lg mx-auto py-5 no-hover-effect')}>
          <h1 className={classnames(styles.title, 'text-3xl font-bold my-3')}>{ post.options.title }</h1>
          <p>{ post.options.createdAt }</p>
          <p className='text-lg my-1'>{ post.options.description }</p>
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
