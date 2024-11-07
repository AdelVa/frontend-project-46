import _ from "lodash";

export const getComparison = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const jointKeys = _.sortBy(_.union(keys1, keys2));

  const result = jointKeys.flatMap((key) => {
    const valueOld = data1[key];
    const valueNew = data2[key];

    // случай: ключ удален
    if (!Object.hasOwn(data2, key)) {
      return { type: "deleted", key, valueOld };
    }
    // случай: ключ добавлен
    if (!Object.hasOwn(data1, key)) {
      return { type: "new key added", key, valueNew };
    }
    // случай: значение ключа изменилось
    // случай: нет изменений
    if (data1[key] !== data2[key]) {
      return {
        type: "changed",
        key,
        valueOld,
        valueNew,
      };
    }
    return { type: "no changes", key, valueOld };
  });
  return result;
};

export default getComparison;
