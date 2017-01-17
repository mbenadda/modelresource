export interface IQueryParams {
  cleanLoad?: boolean;
  forceRequest?: boolean;
  limit?: number;
  offset?: number;
  [propName: string]: boolean | null | number | string | undefined;
};
