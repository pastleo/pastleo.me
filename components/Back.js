import { useMemo } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Back = ({ to, className, children, size }) => {
  const router = useRouter();
  const goBack = useMemo(() => to ? () => {
    router.push(to);
  } : () => {
    const href = location.href;
    router.back();

    setTimeout(() => {
      if (location.href === href) {
        router.push('/'); // fallback to index
      }
    }, 200);
  }, [to, router]);

  return (
    <a
      title={children || 'back'}
      className={classnames('inline-block hover:cursor-pointer', className)}
      onClick={goBack}
    >
      <FontAwesomeIcon icon={faAngleLeft} size={size} />
      { children && (
        <span className='ml-3'>{ children }</span>
      ) }
    </a>
  );
};

Back.defaultProps = {
  className: '',
  children: null,
  size: 'lg',
};

export default Back;
