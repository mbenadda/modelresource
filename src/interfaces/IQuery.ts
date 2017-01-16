import { IQueryParams } from './IQueryParams';

export interface IQuery {
  __did_invalidate?: boolean;
  __failed_to_load?: boolean;
  __has_localonly_data?: boolean;
  __is_loading: boolean;
  __last_updated: number;
  list: { [key: string]: string };
  offset: number;
  query: IQueryParams;
  total_count: number;
};
