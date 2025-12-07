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
  const shiftLeft = 2;
  const indent = ' '.repeat(depth * spacesCount - shiftLeft);

  const result = tree
    .map((item) => {
      switch (item.type) {
        case 'added':
          return `${indent}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'changed':
          return `${indent}- ${item.key}: ${stringify(
            item.valueOld,
            depth + 1,
          )}\n${indent}+ ${item.key}: ${stringify(item.valueNew, depth + 1)}`;
        case 'nested':
          return `${indent}  ${item.key}: ${stylish(item.children, depth + 1)}`;
        default:
          throw new Error(`Unknown type: ${item.type}!`);
      }
    })
    .join('\n');

  const outerIndent = ' '.repeat((depth - 1) * spacesCount); // Отступ для внешней скобки
  return `{\n${result}\n${outerIndent}}`;
};

export default stylish;
