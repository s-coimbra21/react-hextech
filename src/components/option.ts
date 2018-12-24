export interface Option<T = any> {
  label?: string;
  value: T;
  [key: string]: any;
}
