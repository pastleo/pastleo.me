const PARAMS_KV_JOINER = '-';
const PARAMS_JOINER = '_';

export const genQuery = ({ page }) => Object.entries({
  page: page + 1,
}).map(
  p => p.join(PARAMS_KV_JOINER),
).join(PARAMS_JOINER);

export const genLinkProps = params => params.page === 0 ? ({
  href: '/',
}) : ({
  href: '/posts/[q]', as: `/posts/${genQuery(params)}`,
});

export const parseQuery = query => {
  const { page } = Object.fromEntries(
    query.split(PARAMS_JOINER).map(q => q.split(PARAMS_KV_JOINER)),
  );
  return {
    page: parseInt(page) - 1,
  };
};
