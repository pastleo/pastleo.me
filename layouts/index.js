import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above:
fontawesomeConfig.autoAddCss = false;

import HtmlHead from '../components/HtmlHead.js';

import ContentLayout from './ContentLayout.js';

export const withLayout = (options = {}) => PageComponent => {
  const Layout = options.Layout || ContentLayout;

  const Component = (
    props => (
      <>
        <HtmlHead options={{ ...options, ...props.options }} />
        <Layout>
          <PageComponent {...props} />
        </Layout>
      </>
    )
  );

  const getInitialProps = options.getInitialProps || PageComponent.getInitialProps;
  if (getInitialProps) {
    Component.getInitialProps = getInitialProps;
  }

  return Component;
};

export default withLayout;
