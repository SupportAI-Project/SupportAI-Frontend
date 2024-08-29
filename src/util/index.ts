export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, currentValue) => {
    const groupKey = String(currentValue[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {} as Record<string, T[]>);
}
export function groupByDay<T extends { timeStamp: Date }>(
  array: T[]
): Record<string, T[]> {
  if (array.length === 0) {
    return {};
  }
  return array.reduce((result, currentValue) => {
    const timeStamp = new Date(currentValue.timeStamp).toUTCString();

    const dateKey = timeStamp.split(/\s\d{4}/)[0];
    if (!result[dateKey]) {
      result[dateKey] = [];
    }
    result[dateKey].push(currentValue);
    return result;
  }, {} as Record<string, T[]>);
}
