import { render, screen } from '@testing-library/react';
import Index, { getStaticProps } from '../../pages/index';

describe('Index', () => {
  let indexPageProps;

  beforeAll(async () => {
    indexPageProps = (await getStaticProps()).props;
  });

  it('renders', () => {
    render(<Index {...indexPageProps} />);
  });

  it('renders title of the first post if exists', () => {
    if (indexPageProps.posts.length <= 0) return;

    render(<Index {...indexPageProps} />);
    const firstPostTitle = screen.getByText(indexPageProps.posts[0].options.title);

    expect(firstPostTitle).toBeInTheDocument();
  });
});
