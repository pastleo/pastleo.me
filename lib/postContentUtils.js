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

const YOUTUBE_REGEX = /^https:\/\/.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
export const toYoutubeEmbedUrl = url => {
  const match = url.match(YOUTUBE_REGEX);

  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};
