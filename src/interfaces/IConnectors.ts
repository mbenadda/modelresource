import { IQueryParams } from './IQueryParams';
import { Observable } from 'rxjs/Observable';

export interface IConnectors {
  delete: {
    (url: string):
    Observable<boolean>
  };
  get: {
    (url: string, params?: IQueryParams):
    Observable<{ [propName: string]: any }>
  };
  post: {
    (url: string, payload?: { [propName: string]: any }, params?: IQueryParams):
    Observable<{ [propName: string]: any }>
  };
  put: {
    (url: string, payload?: { [propName: string]: any }, params?: IQueryParams):
    Observable<{ [propName: string]: any }>
  };
  query: {
    (url: string, params?: IQueryParams):
    Observable<{
      list: Array<string>,
      meta: { offset: number, total_count: number },
      objects: { [propName: string]: { [propName: string]: any } },
      query: IQueryParams,
    }>
  };
};
