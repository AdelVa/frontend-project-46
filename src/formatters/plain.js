import _ from 'lodash';

const valueType = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const result = (item, path) => {
    const property = `${path}${item.key}`;

    switch (item.type) {
      case 'changed':
        return `Property '${property}' was updated. From ${valueType(
          item.valueOld,
        )} to ${valueType(item.valueNew)}`;
      case 'nested':
        return item.children
          .map((child) => result(child, `${property}.`))
          .filter(Boolean)
          .join('\n');
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'new key added':
        return `Property '${property}' was added with value: ${valueType(
          item.value,
        )}`;
      default:
        return null;
    }
  };

  return tree
    .flatMap((item) => result(item, ''))
    .filter(Boolean)
    .join('\n');
};

export default plain;
