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
  const iter = (item, path) => {
    const property = `${path}${item.key}`;

    switch (item.type) {
      case 'added':
        return `Property '${property}' was added with value: ${valueType(
          item.value
        )}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${valueType(
          item.valueOld
        )} to ${valueType(item.valueNew)}`;
      case 'nested':
        return item.children
          .map((child) => iter(child, `${property}.`))
          .filter(Boolean)
          .join('\n');
      default:
        return null;
    }
  };

  return tree
    .flatMap((item) => iter(item, ''))
    .filter(Boolean)
    .join('\n');
};

export default plain;
