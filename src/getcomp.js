import _ from "lodash";

export const getComparison = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const jointKeys = _.sortBy(_.union(keys1, keys2));

  const compareKeys = (key) => {
    const valueOld = data1[key];
    const valueNew = data2[key];

    // случай: ключ удален
    if (!Object.hasOwn(data2, key)) {
      return { type: "deleted", key, valueOld };
    }
    // случай ключ добавлен
    if (!Object.hasOwn(data1, key)) {
      return { type: "new key added", key, valueNew };
    }
    // случай: значение ключа изменилось
    // случай: нет изменений
    if (data1[key] !== data2[key]) {
      return { type: "changed", key, valueOld, valueNew };
    } else {
      return { type: "no changes", key, valueOld };
    }
  };

  const result = jointKeys.flatMap((key) => compareKeys(key));

  const spacerSmall = `  `;
  const spacerBig = `    `;

  const changeAlert = (item) => {
    switch (item.type) {
      case "no changes":
        return `${spacerBig}${item.key}: ${item.valueOld}`;
        break;
      case "changed":
        return (
          `${spacerSmall}- ${item.key}: ${item.valueOld}` +
          `\n` +
          `${spacerSmall}+ ${item.key}:${item.valueNew}`
        );
        break;
      case "deleted":
        return `${spacerSmall}- ${item.key}: ${item.valueOld}`;
        break;
      case "new key added":
        return `${spacerSmall}+ ${item.key}: ${item.valueNew}`;
        break;
      default:
        throw new Error(`Unexpected out of range value - ${item.type}`);
    }
  };

  const formattedResult = result.map((item) => changeAlert(item));

  return `{\n${formattedResult.join("\n")}` + `\n}`;
};

export default getComparison;
