import { IModel } from '../interfaces/IModel';
import { IQuery } from '../interfaces/IQuery';
import { IQueryParams } from '../interfaces/IQueryParams';
import omitIrrelevantParams from '../utils/omitIrrelevantParams';
import queriesActions from '../actionCreators/queries';
import resourcesActions from '../actionCreators/resources';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMapTo';

export default function query (this: IModel, params: IQueryParams) {
  let query$;
  let relevantParams = omitIrrelevantParams(params);
  let queryKey = JSON.stringify(relevantParams);

  let currentState = this.store.getValue();
  let existingQuery = currentState &&
                      currentState.queries &&
                      currentState.queries[this.meta.modelName] &&
                      currentState.queries[this.meta.modelName][queryKey];

  let missingIndexes = getMissingIndexes(existingQuery, params);

  // There is no existing available data
  if (!existingQuery ||
    // The existing data was invalidated at some point and the caller requested a cache update
    (existingQuery.__did_invalidate && params.cleanLoad) ||
    // Our existing data does not cover the whole scope of the request
    missingIndexes.length ||
    // The caller forced a server reload of the data
    params.forceRequest) {

    this.store.dispatch(queriesActions.start(this.meta.modelName, params));

    query$ = this.connectors.query(this.baseUrl + '/' + this.meta.modelName, {
      ...relevantParams,
      limit: params.forceRequest ? params.limit : missingIndexes[missingIndexes.length - 1] - missingIndexes[0] + 1,
      offset: params.forceRequest ? 0 : missingIndexes[0],
    })
    .do((data) => {
      // Add every one of the resources we just got to the store
      Object.keys(data.objects).forEach((key, index, array) => {
        // TODO: Add the capability to insert resources depending on other models
        // into the store from the data.objects map we have here
        this.store.dispatch(resourcesActions.receive(new this(data.objects[key]), true));
      });
      // Update the query results after we do the items themselves so we know we can map on the
      // results to get the resources
      this.store.dispatch(queriesActions.receive(this.meta.modelName, { ...data, query: relevantParams }));
    }, (error) => {
      this.store.dispatch(queriesActions.failToLoad(this.meta.modelName, relevantParams));
    });
  }

  return (query$ || Observable.of({}))
    .switchMapTo(
      this.store
      .filter((value) => { return !!value; })
      .map((state) => {
        let query = state &&
                    state.queries &&
                    state.queries[this.meta.modelName] &&
                    state.queries[this.meta.modelName][queryKey];

        // If there's a list, replace the resource uris with the actual objects for easier consumption
        if (query && query.list) {
          return {
            ...query,
            list: new Array(params.limit || 10)
              // Get all the possible indexes the caller asked for
              .map((item, index, array) => { return (params.offset || 0) + index; })
              // Replace the indexes by the relevant listing resource uri from the stored query
              .map((item) => { return query.list[item]; })
              // Drop undefined items
              .filter((item) => { return !!item; })
              // Replace the resource uris with the actual resource instances
              .map((resourceIdentifier) => {
                // The resource identifier is a resource uri
                if (resourceIdentifier.indexOf('/') !== -1) {
                  return state.resources[state.idmap.internalId[resourceIdentifier] || ''];
                }
                // The resource identifier is already a local uuid
                else {
                  return state.resources[resourceIdentifier];
                }
              })
              // Drop undefined items
              .filter((item) => { return !!item; }),
          };
        }
        else { return query; }
      })
      .filter((value) => { return value !== undefined; })
      .distinctUntilChanged()
    );
};

function getMissingIndexes (query: IQuery, params: IQueryParams) {
  let offset: number, limit: number;
  offset = Number.isInteger(params.offset || NaN) && params.offset || 0;
  limit = Math.min(
    Number.isInteger(params.limit || NaN) && params.limit || 10,
    Number.isInteger(query.total_count || NaN) && query.total_count || 999
  );
  // Create an array with as many items as the needed entities in the query
  return new Array(limit)
    // Start from the offset and list the indexes of the needed items in the query
    .map((item, indexInThis) => { return offset + indexInThis; })
    // Drop the indexes we already have in our query list cache
    .filter((indexInQuery, indexInThis, array) => {
      return (query && query.__did_invalidate && params.cleanLoad) ||
        (!(query &&
           query.list &&
           query.list[indexInQuery]));
    });
}