export const detect = () => {
  if (typeof document !== 'object') { // nodejs
    return true;
  }
  const elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  } else {
    return false;
  }
};

const supported = detect();
export default supported;
