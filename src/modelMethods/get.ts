import { IModel } from '../interfaces/IModel';
import { IQueryParams } from '../interfaces/IQueryParams';
import { IReduxState } from '../interfaces/IReduxState';
import getResourceByRemote from '../utils/getResourceByRemote';
import omit from 'lodash/omit';
import resourcesActions from '../actionCreators/resources';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMapTo';

export default function get (this: IModel, params: IQueryParams) {
  let get$;

  if (!params[this.meta.idName]) {
    throw new Error('Cannot call ModelResource.get without an ID.');
  }

  // Build the URL we'll be hitting with our GET request
  let resourceUri = this.makeUri(String(params[this.meta.idName]));
  let resourceUrl = this.makeUrl(String(params[this.meta.idName]));
  // Check if we already have the resource in our store
  let existingResource = getResourceByRemote(this.store.getValue(), resourceUri)

  // If the resource exists, did not fail to load and was not invalidated, there's nothing to do but
  // return the right section of the state, as we're doing below.

  // Otherwise we need to load it
  if (!existingResource ||
      existingResource.__did_invalidate ||
      existingResource.__failed_to_load) {

    this.store.dispatch(resourcesActions.request(resourceUri, this));

    get$ = this.connectors.get(resourceUrl, omit(params, this.meta.idName) as IQueryParams)
      .do((rawResource: { [propName: string]: any }) => {
        this.store.dispatch(resourcesActions.receive(new this(rawResource), true));
      }, (error: Error) => {
        this.store.dispatch(resourcesActions.failToLoad(resourceUri, error, this));
      });
  }

  return (get$ || Observable.of({}))
    .switchMapTo(
      this.store.map((state: IReduxState) => {
        return getResourceByRemote(state, resourceUri);
      })
      .filter((value) => { return value !== undefined; })
      .distinctUntilChanged()
    );
};
