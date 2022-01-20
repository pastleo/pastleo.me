import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ResumeContent from './ResumeContent.js';

export const ResumeDetail = ({ locale }) => {
  const [containerDom, setContainerDom] = useState(null);

  useEffect(() => {
    const dom = document.createElement('div');
    dom.id = 'resume-detail-container';
    document.body.appendChild(dom);
    setContainerDom(dom);

    return () => {
      dom.remove();
    };
  }, []);

  return containerDom ? createPortal(
    <ResumeContent locale={locale} />,
    containerDom,
  ) : null;
};

export default ResumeDetail;
