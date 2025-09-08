export interface IFilterResponse<T> {
  total: number;
  total_page: number;
  result: T[];
}
