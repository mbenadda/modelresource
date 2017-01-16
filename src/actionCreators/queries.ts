import { IResource } from '../interfaces/IResource';
import { IQueryParams } from '../interfaces/IQueryParams';
import omitIrrelevantParams from '../utils/omitIrrelevantParams';

class ActionQueriesFailToLoad {
  readonly type: 'FAIL_TO_LOAD_QUERY';
  readonly modelName: string;
  readonly query: IQueryParams;

  constructor (modelName: string, query: IQueryParams) {
    this.type = 'FAIL_TO_LOAD_QUERY';
    this.modelName = modelName;
    this.query = omitIrrelevantParams(query);
  };
};
let failToLoad = (modelName: string, query: IQueryParams) => {
  return new ActionQueriesFailToLoad(modelName, query);
};

class ActionQueriesInvalidateByQuery {
  readonly type: 'INVALIDATE_QUERY_BY_QUERY';
  readonly modelName: string;
  readonly query: IQueryParams;

  constructor (modelName: string, query: IQueryParams) {
    this.type = 'INVALIDATE_QUERY_BY_QUERY';
    this.modelName = modelName;
    this.query = omitIrrelevantParams(query);
  };
};
let invalidateByQuery = (modelName: string, query: IQueryParams) => {
  return new ActionQueriesInvalidateByQuery(modelName, query);
};

class ActionQueriesInvalidateByResource {
  readonly type: 'INVALIDATE_QUERY_BY_RESOURCE';
  readonly modelName: string;

  constructor (modelName: string) {
    this.type = 'INVALIDATE_QUERY_BY_RESOURCE';
    this.modelName = modelName;
  };
};
let invalidateByResource = (modelName: string) => {
  return new ActionQueriesInvalidateByResource(modelName);
};

class ActionQueriesPushElement {
  readonly type: 'PUSH_ELEMENT_INTO_QUERY';
  readonly element: IResource;
  readonly modelName: string;
  readonly query: IQueryParams;

  constructor (modelName: string, query: IQueryParams, element: IResource) {
    this.type = 'PUSH_ELEMENT_INTO_QUERY';
    this.element = element;
    this.modelName = modelName;
    this.query = query;
  };
};
let pushIntoQuery = (modelName: string, query: IQueryParams, element: IResource) => {
  return new ActionQueriesPushElement(modelName, query, element);
};

type incomingQuery = {
  list: Array<string>;
  meta: {
    offset: number;
    total_count: number;
  };
  query: IQueryParams;
};
class ActionQueriesReceive {
  readonly type: 'RECEIVE_QUERY';
  readonly list: Array<string>;
  readonly meta: {
    readonly offset: number;
    readonly total_count: number;
  };
  readonly modelName: string;
  readonly query: IQueryParams;

  constructor (modelName: string, data: incomingQuery) {
    this.type = 'RECEIVE_QUERY';
    this.list = data.list;
    this.meta = data.meta;
    this.modelName = modelName;
    this.query = omitIrrelevantParams(data.query);
  };
};
let receive = (modelName: string, data: incomingQuery) => {
  return new ActionQueriesReceive(modelName, data);
};

class ActionQueriesStartLoading {
  readonly type: 'START_LOADING_QUERY';
  readonly modelName: string;
  readonly query: IQueryParams;

  constructor (modelName: string, query: IQueryParams) {
    this.type = 'START_LOADING_QUERY';
    this.modelName = modelName;
    this.query = omitIrrelevantParams(query);
  };
};
let start = (modelName: string, query: IQueryParams) => {
  return new ActionQueriesStartLoading(modelName, query);
}

export {
  ActionQueriesFailToLoad,
  ActionQueriesInvalidateByQuery,
  ActionQueriesInvalidateByResource,
  ActionQueriesPushElement,
  ActionQueriesReceive,
  ActionQueriesStartLoading,
};

export default {
  failToLoad,
  invalidateByQuery,
  invalidateByResource,
  pushIntoQuery,
  receive,
  start,
};