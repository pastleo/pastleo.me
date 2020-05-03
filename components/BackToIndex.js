import Link from 'next/link';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const BackToIndexLink = ({ className, children, size }) => (
  <Link href='/'>
    <a className={classnames('inline-block', className)}>
      <FontAwesomeIcon icon={faAngleLeft} size={size} />
      { children && (
        <span className='ml-3'>{ children }</span>
      ) }
    </a>
  </Link>
);

BackToIndexLink.defaultProps = {
  className: '',
  children: null,
  size: 'lg',
};

export default BackToIndexLink;
