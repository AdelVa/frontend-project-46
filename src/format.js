import * as stylish from './stylish.js';

export const getFormat = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Unexpected out of range value - ${format}!`);
  }
};

export default getFormat;
