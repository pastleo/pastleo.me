import { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import ExternalImage from '../components/ExternalImage.js';

import styles from '../styles/components/post-banner.module.scss';

const PostBanner = ({
  title, createdAt, description, thumbnail,
  className, contentClassName, titleClassName, keepLineActive,
}) => {
  const [imageEnabled, setImageEnabled] = useState(false);
  useEffect(() => {
    if (thumbnail) {
      setImageEnabled(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [imageLoaded, setImageLoaded] = useState(false);
  const onImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div
      className={
        classnames(styles.postBanner, 'relative', className)
      }
    >
      { imageEnabled && (
        <ExternalImage
          alt=''
          src={thumbnail}
          className={classnames(styles.thumbnail, { [styles.loaded]: imageLoaded })}
          onLoad={onImageLoaded}
        />
      ) }
      <div
        className={
          classnames(
            styles.content,
            { 'md:pt-32': !!thumbnail },
            contentClassName,
          )
        }
      >
        <h1 className={
          classnames(
            styles.title, 'font-bold my-3', titleClassName,
            { [styles.keepLineActive]: keepLineActive },
          )
        }>
          { title }
        </h1>
        <p>{ createdAt }</p>
        { description && (
          <p className='text-lg my-1'>{ description }</p>
        ) }
      </div>
    </div>
  );
};

export default PostBanner;
