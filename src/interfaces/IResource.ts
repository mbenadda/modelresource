import { IModel } from './IModel';

export interface IResource {
  __did_invalidate?: boolean;
  __error?: Error;
  __failed_to_load?: boolean;
  __has_localonly_data?: boolean;
  __is_loading?: boolean;
  __local_uuid: string;
  constructor: IModel;
  resource_uri: string;
  [propName: string]: any;
};
