import _ from 'lodash';

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }

  const spacesCount = 4;
  const indent = ' '.repeat(depth * spacesCount);
  const entries = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`)
    .join('\n');

  return `{\n${entries}\n${' '.repeat((depth - 1) * spacesCount)}}`;
};

const stylish = (tree, depth = 1) => {
  const spacesCount = 4;
  const leftShift = 2;
  const indent = ' '.repeat(depth * spacesCount - leftShift);

  const formattedResult = tree.map((item) => {
    switch (item.type) {
      case 'no changes':
        return `${indent}  ${item.key}: ${stringify(item.value, depth + 1)}`;
      case 'changed':
        return `${indent}- ${item.key}: ${stringify(
          item.valueOld,
          depth + 1,
        )}\n${indent}+ ${item.key}: ${stringify(item.valueNew, depth + 1)}`;
      case 'nested':
        return `${indent}  ${item.key}: ${stylish(item.children, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${item.key}: ${stringify(item.value, depth + 1)}`;
      case 'new key added':
        return `${indent}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
      default:
        throw new Error(`Unexpected out of range value - ${item.type}`);
    }
  });
  return `{\n${formattedResult.join('\n')}\n}`;
};

export default stylish;
