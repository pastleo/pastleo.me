import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';

import ExternalImage from './ExternalImage.js';

import { extractTextContent, toYoutubeEmbedUrl } from '../lib/postContentUtils.js';

import styles from '../styles/components/post-content.module.scss';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

const PostContent = ({ children }) => (
  <div className={styles.postContent}>
    { children }
  </div>
);

export default PostContent;

const Heading = tag => {
  const component = ({ children }) => {
    const textContent = extractTextContent(children);
    return React.createElement(
      tag,
      { id: textContent },
      children,
      (
        <a className={classnames(styles.anchor, 'ml-1')} href={`#${textContent}`}>
          <FontAwesomeIcon icon={faAnchor} size='sm' />
        </a>
      ),
    );
  };
  component.displayName = tag;
  return component;
};

const EXTERNAL_URL_REGEX = new RegExp('^https?://');
const Link = ({ children, href }) => {
  if (href.match(EXTERNAL_URL_REGEX)) {
    return (
      <a href={href} target='_blank' rel='noopener noreferrer'>
        { children }
      </a>
    );
  }

  return <a href={href}>{ children }</a>;
};

const CodeBlock = ({ children, className }) => {
  if (!children || children.length <= 0) return null;

  if (children.length == 1 && children[0].indexOf('\n') === -1) {
    return <code>{ children[0] }</code>;
  }

  const code = children.join();
  const languageClassNameMatched = (className || '').match(/language-(\w+)/);
  if (!languageClassNameMatched) {
    return (
      <pre className='prism-code language-none'>
        { code }
      </pre>
    );
  }
  return (
    <Highlight {...defaultProps} code={code.replace(/\n$/, '')} language={languageClassNameMatched[1]} theme={undefined}>
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

const Table = ({ children }) => (
  <div className={styles.tableContainer}>
    <table>{ children }</table>
  </div>
);

const YoutubeVideo = ({ url }) => (
  <div className={styles.videoContainer}>
    <iframe src={url} width='560' height='315' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
  </div>
);

const Paragraph = ({ children, node }) => {
  if ( // this paragraph have only one link
    node.children.length === 1 &&
    node.children[0].tagName === 'a'
  ) {
    const youtubeEmbedUrl = toYoutubeEmbedUrl(node.children[0]?.properties?.href);
    if (youtubeEmbedUrl) {
      return <YoutubeVideo url={youtubeEmbedUrl} />;
    }
  }

  return <p>{ children }</p>;
};

export const components = {
  h1: Heading('h1'),
  h2: Heading('h2'),
  h3: Heading('h3'),
  h4: Heading('h4'),
  h5: Heading('h5'),
  h6: Heading('h6'),
  a: Link,
  code: CodeBlock,
  table: Table,
  img: ExternalImage,
  p: Paragraph,
};
