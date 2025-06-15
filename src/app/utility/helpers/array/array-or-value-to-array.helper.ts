import { isArray } from 'lodash';

export const arrayOrValueToArray: <TValue>(value: Array<TValue> | TValue) => Array<TValue> =
  (value) => isArray(value) ? value : value ? [value] : [];

export const arrayToRecord: <T>(key: number | string, value: Array<T>) => Record<number | string, T> =
  (key: any, value: Array<any>) => {
    const records: Record<string | number, any> = {};
    (value || []).forEach((v) => records[v[key]] = v);
    return records;
  };
