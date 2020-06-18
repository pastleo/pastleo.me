import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import classnames from 'classnames';

import withLayout from './index.js';

import PostBanner from '../components/PostBanner.js';
import BackToIndexLink from '../components/BackToIndex.js';

import 'prism-themes/themes/prism-vsc-dark-plus.css';
import styles from '../styles/layouts/post-wrapper.scss';

const CodeBlock = ({ children, className }) => {
  const languageClassNameMatched = (className || '').match(/language-(\w+)/);
  if (!languageClassNameMatched) {
    return (
      <pre className='prism-code language-none'>
        { children }
      </pre>
    );
  }
  return (
    <Highlight {...defaultProps} code={children.replace(/\n$/, '')} language={languageClassNameMatched[1]} theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          { tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const Link = ({ children, href }) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    { children }
  </a>
);

const components = {
  code: CodeBlock,
  a: Link,
};

const PostWrapper = ({ children, options: { description, ...bannerOptions } }) => (
  <MDXProvider components={components}>
    <div className='break-words max-w-screen-lg mx-auto'>
      <PostBanner
        {...bannerOptions}
        contentClassName={bannerOptions.thumbnail && 'p-5'}
        titleClassName='text-4xl'
        keepLineActive
      />
      <div className={styles.postWrapper}>
        { children }
      </div>
    </div>
    <div className='p-3 text-center'>
      <BackToIndexLink className='p-3'>Back</BackToIndexLink>
    </div>
  </MDXProvider>
);

export default withLayout()(PostWrapper);
