const yaml = require('yaml');

function extractFrontmatter() {
  return tree => {
    const yamlNode = tree.children.find(node => node.type === 'yaml');
    if (yamlNode) {
      const options = yaml.parse(yamlNode.value);

      tree.children = [
        ...tree.children,
        { type: 'export', value: `export const options = ${JSON.stringify(options)}` },
      ];

      if (options.layout) {
        tree.children = [
          { type: 'import', value: `import MdxLayout from '${options.layout}';` },
          ...tree.children,
          { type: 'export', value: 'export default MdxLayout;', default: true },
        ];
      }
    }

    tree.children = tree.children.filter(node => node.type !== 'yaml');
  };
}

module.exports = extractFrontmatter;
