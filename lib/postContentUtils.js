export const getHost = url => {
  try {
    const urlParsed = new URL(url);
    return urlParsed.host;
  } catch (e) {
    return '';
  }
};

export const extractTextContent = children => {
  if (typeof children === 'string') {
    return children;
  } else if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  } else if (children.props && children.props.children) {
    return extractTextContent(children.props.children);
  } else {
    return children.toString();
  }
};
