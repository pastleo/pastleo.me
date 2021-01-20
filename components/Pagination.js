import Link from 'next/link';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { genLinkProps } from '../lib/posts.js';

const PageLink = ({ page, title, children }) => (
  <Link {...genLinkProps({ page })}>
    <a className='hover:text-white' title={title}>{ children }</a>
  </Link>
);

const Separator = () => <span className='mx-3'>|</span>;

const Pagination = ({ currentPage, totalPages, className }) => (
  <div className={classnames('p-3 text-center', className)}>
    { currentPage > 0 && (
      <>
        <PageLink page={currentPage - 1} title='Previous Page'>
          <FontAwesomeIcon icon={faAngleLeft} size='lg' className='mx-3' />
          Previous Page
        </PageLink>
        <Separator />
      </>
    ) }
    { totalPages > 1 && currentPage + 1 }
    { (currentPage < totalPages - 1) && (
      <>
        <Separator />
        <PageLink page={currentPage + 1} title='Next Page'>
          Next Page
          <FontAwesomeIcon icon={faAngleRight} size='lg' className='mx-3' />
        </PageLink>
      </>
    ) }
  </div>
);

export default Pagination;
