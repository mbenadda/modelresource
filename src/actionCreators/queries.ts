import { IResource } from '../interfaces/IResource';
import { IQueryParams } from '../interfaces/IQueryParams';
import omitIrrelevantParams from '../utils/omitIrrelevantParams';

interface IActionQueriesFailToLoad {
  type: 'FAIL_TO_LOAD_QUERY';
  modelName: string;
  query: IQueryParams;
};
let failToLoad = (modelName: string, query: IQueryParams): IActionQueriesFailToLoad => {
  return {
    type: 'FAIL_TO_LOAD_QUERY',
    modelName,
    query: omitIrrelevantParams(query),
  };
};

interface IActionQueriesInvalidateByQuery {
  type: 'INVALIDATE_QUERY_BY_QUERY';
  modelName: string;
  query: IQueryParams;
};
let invalidateByQuery = (modelName: string, query: IQueryParams): IActionQueriesInvalidateByQuery => {
  return {
    type: 'INVALIDATE_QUERY_BY_QUERY',
    modelName,
    query: omitIrrelevantParams(query),
  };
};

interface IActionQueriesInvalidateByResource {
  type: 'INVALIDATE_QUERY_BY_RESOURCE';
  modelName: string;
};
let invalidateByResource = (modelName: string): IActionQueriesInvalidateByResource => {
  return {
    type: 'INVALIDATE_QUERY_BY_RESOURCE',
    modelName,
  };
};

interface IActionQueriesPushElement {
  type: 'PUSH_ELEMENT_INTO_QUERY';
  element: IResource;
  modelName: string;
  query: IQueryParams;
};
let pushIntoQuery = (modelName: string, query: IQueryParams, element: IResource): IActionQueriesPushElement => {
  return {
    type: 'PUSH_ELEMENT_INTO_QUERY',
    element,
    modelName,
    query,
  };
};

interface IActionQueriesReceive {
  type: 'RECEIVE_QUERY';
  list: Array<string>;
  meta: {
    offset: number;
    total_count: number;
  };
  modelName: string;
  query: IQueryParams;
};
let receive = (
  modelName: string,
  data: {
    list: Array<string>,
    meta: {
      offset: number;
      total_count: number;
    },
    query: IQueryParams
  }
): IActionQueriesReceive => {
  return {
    type: 'RECEIVE_QUERY',
    list: data.list,
    meta: data.meta,
    modelName,
    query: omitIrrelevantParams(data.query),
  };
};

interface IActionQueriesStartLoading {
  type: 'START_LOADING_QUERY',
  modelName: string;
  query: IQueryParams;
};
let start = (modelName: string, query: IQueryParams): IActionQueriesStartLoading => {
  return {
    type: 'START_LOADING_QUERY',
    modelName,
    query: omitIrrelevantParams(query),
  };
}

export {
  IActionQueriesFailToLoad,
  IActionQueriesInvalidateByQuery,
  IActionQueriesInvalidateByResource,
  IActionQueriesPushElement,
  IActionQueriesReceive,
  IActionQueriesStartLoading,
};

export default {
  failToLoad,
  invalidateByQuery,
  invalidateByResource,
  pushIntoQuery,
  receive,
  start,
};