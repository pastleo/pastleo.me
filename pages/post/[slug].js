import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import withLayout from '../../layouts/index.js';

import PostBanner from '../../components/PostBanner.js';
import PostContent, { components } from '../../components/PostContent.js';
import Back from '../../components/Back.js';

import * as postsData from '../../lib/node/posts.js';

const Post = ({ content, options: { description, ...bannerOptions } }) => (
  <div className='break-words max-w-screen-lg mx-auto'>
    <PostBanner
      {...bannerOptions}
      contentClassName={bannerOptions.thumbnail && 'p-5'}
      titleClassName='text-2xl md:text-4xl'
      keepLineActive
    />

    <PostContent>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
      >
        { content }
      </ReactMarkdown>
    </PostContent>

    <div className='py-3 text-center'>
      <Back className='p-3'>Back</Back>
    </div>
  </div>
);

export default withLayout()(Post);

export async function getStaticProps({ params }) {
  const { options, content } = await postsData.postDetail(params.slug);

  return {
    props: { options, content },
  };
}

export async function getStaticPaths() {
  const posts = await postsData.all();

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
