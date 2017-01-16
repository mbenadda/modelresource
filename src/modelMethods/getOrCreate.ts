import { IModel } from '../interfaces/IModel';
import getResourceByLocal from '../utils/getResourceByLocal';
import resourcesActions from '../actionCreators/resources';
import {
  ActionResourcesFinishLoading,
  ActionResourcesFinishLoadingSafe,
  ActionResourcesInitialize,
} from '../actionCreators/resources';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export default function getOrCreate (this: IModel, seed: { [propName: string]: any }) {
  let initializeAction: ActionResourcesFinishLoading | ActionResourcesFinishLoadingSafe | ActionResourcesInitialize;

  // We're creating an instance from a resource we got from the server
  if (seed['resource_uri']) {
    initializeAction = resourcesActions.receive(new this(seed), true);
    this.store.dispatch(initializeAction);
  }
  // We're creating an entirely new resource
  else {
    initializeAction = resourcesActions.initialize(new this(seed));
    this.store.dispatch(initializeAction);
  }

  // We need to return an observable even though create is sync so consumers can be up to date
  return this.store.map((state) => {
    return getResourceByLocal(state, initializeAction.localUuid);
  })
  .filter((value) => { return value !== undefined; })
  .distinctUntilChanged();
};
