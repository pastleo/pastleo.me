import assets from '../data/blog-assets.json' with { type: 'json' };

export const blogImage = (url) => assets[url] ?? url;

const text = (node) => node.type === 'text' ? node.value : (node.children ?? []).map(text).join('');
const element = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });

function youtubeUrl(href) {
  try {
    const url = new URL(href);
    const id = url.hostname === 'youtu.be' ? url.pathname.slice(1)
      : ['youtube.com', 'www.youtube.com'].includes(url.hostname)
        ? (url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|v)\/([^/]+)/)?.[1]) : null;
    return /^[\w-]{11}$/.test(id ?? '') ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch { return null; }
}

// Applied at build time: ordinary Markdown stays the only post source.
export default function rehypeBlog() {
  return (tree) => {
    function visit(parent) {
      if (!parent.children) return;
      parent.children = parent.children.map((node) => {
        visit(node);
        if (node.type !== 'element') return node;
        if (/^h[1-6]$/.test(node.tagName)) {
          // The legacy renderer used the literal heading text as the fragment.
          const label = text(node);
          node.properties.id = label;
          node.children.push(element('a', { href: `#${label}`, className: ['heading-anchor'], ariaLabel: `連結至 ${label}` }, [{ type: 'text', value: '#' }]));
        }
        if (node.tagName === 'a' && /^https?:\/\//.test(node.properties.href ?? '')) {
          node.properties.target = '_blank';
          node.properties.rel = ['noopener', 'noreferrer'];
        }
        if (node.tagName === 'img') {
          node.properties.src = blogImage(node.properties.src);
          node.properties.loading = 'lazy';
          node.properties.decoding = 'async';
        }
        if (node.tagName === 'table') {
          return element('div', { className: ['table-scroll'], tabIndex: 0, role: 'region', ariaLabel: '表格（可左右捲動）' }, [node]);
        }
        if (node.tagName === 'pre') {
          node.properties.tabIndex = 0;
          node.properties.ariaLabel = '程式碼（可左右捲動）';
        }
        if (node.tagName === 'p') {
          const children = node.children.filter((child) => child.type !== 'text' || child.value.trim());
          const url = children.length === 1 && children[0].tagName === 'a' && youtubeUrl(children[0].properties.href);
          if (url) return element('div', { className: ['video-embed'] }, [
            element('iframe', { src: url, title: 'YouTube 影片', loading: 'lazy', allowFullScreen: true, allow: 'encrypted-media; picture-in-picture', referrerPolicy: 'strict-origin-when-cross-origin' }),
            element('a', { href: children[0].properties.href }, [{ type: 'text', value: '在 YouTube 觀看影片 ↗' }]),
          ]);
        }
        return node;
      });
    }
    visit(tree);
  };
}
