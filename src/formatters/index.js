import stylish from './stylish.js';
import plain from './plain.js';

const resultFormat = {
  stylish,
  plain,
};

export default (format = 'stylish') => resultFormat[format];
