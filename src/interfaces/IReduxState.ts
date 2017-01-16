import { IQuery } from './IQuery';
import { IResource } from './IResource';

interface IReduxStateIdmap {
  externalId: { [internalId: string]: null | string | undefined };
  internalId: { [externalId: string]: null | string | undefined };
};

interface IReduxStateQueriesForModel {
  [queryKey: string]: IQuery;
};

interface IReduxStateQueries {
  [modelName: string]: IReduxStateQueriesForModel
};

interface IReduxStateResources {
  [internalId: string]: IResource;
};

interface IReduxState {
  idmap: IReduxStateIdmap;
  queries: IReduxStateQueries;
  resources: IReduxStateResources;
};

export {
  IReduxState,
  IReduxStateIdmap,
  IReduxStateQueries,
  IReduxStateQueriesForModel,
  IReduxStateResources,
};
