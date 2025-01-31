const spacerSmall = '  ';
const spacerBig = '    ';

export const stylish = (tree) => {
  const formattedResult = tree.map((item) => {
    switch (item.type) {
      case 'no changes':
        return `${spacerBig}  ${item.key}: ${item.valueOld}`;
      case 'changed':
        return (
          `${spacerSmall}${spacerSmall}- ${item.key}: ${item.valueOld}`
          + '\n'
          + `${spacerSmall}${spacerSmall}+ ${item.key}: ${item.valueNew}`
        );
      case 'deleted':
        return `${spacerSmall}${spacerSmall}- ${item.key}: ${item.valueOld}`;
      case 'new key added':
        return `${spacerSmall}${spacerSmall}+ ${item.key}: ${item.valueNew}`;
      default:
        throw new Error(`Unexpected out of range value - ${item.type}`);
    }
  });
  return `{\n${formattedResult.join('\n')}\n}`;
};

export default stylish;
