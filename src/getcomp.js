import _ from 'lodash';

const getComparison = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const jointKeys = _.sortBy(_.union(keys1, keys2));

  const result = jointKeys.flatMap((key) => {
    // случай: ключ удален
    if (!Object.hasOwn(data2, key)) {
      return { type: 'deleted', key, value: data1[key] };
    }
    // случай: ключ добавлен
    if (!Object.hasOwn(data1, key)) {
      return { type: 'new key added', key, value: data2[key] };
    }
    // случай: вложеннная структура
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: getComparison(data1[key], data2[key]),
      };
    }
    // случай: значение ключа изменилось
    // случай: нет изменений
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        valueOld: data1[key],
        valueNew: data2[key],
      };
    }
    return { type: 'no changes', key, value: data1[key] };
  });
  return result;
};

export default getComparison;
