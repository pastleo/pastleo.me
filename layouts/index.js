import '../styles/venders/tailwind.css';

import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above:
fontawesomeConfig.autoAddCss = false;

import HtmlHead from '../components/HtmlHead.js';

import ContentLayout from './ContentLayout.js';

import { useGA } from '../lib/ga.js';

import '../styles/layouts/base.scss';

export const withLayout = (options = {}) => PageComponent => {
  const Layout = options.Layout || ContentLayout;

  const Component = (
    props => {
      useGA('UA-57274726-1');

      return (
        <>
          <HtmlHead options={{ ...options, ...props.options }} />
          <Layout>
            <PageComponent {...props} />
          </Layout>
        </>
      );
    }
  );

  const getInitialProps = options.getInitialProps || PageComponent.getInitialProps;
  if (getInitialProps) {
    Component.getInitialProps = getInitialProps;
  }

  return Component;
};

export default withLayout;
