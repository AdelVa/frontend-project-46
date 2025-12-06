import stylish from './stylish.js';
import plain from './plain.js';
import json from './jsonform.js';

const resultFormat = {
  stylish,
  plain,
  json,
};

export default (format = 'stylish') => resultFormat[format];
